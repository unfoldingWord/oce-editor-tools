const StateTransition = { empty: 0, valid: 1, match: 2 };
const wordLike = (char) => {
  var _a;
  return !!((_a =
    char === null || char === void 0 ? void 0 : char.match(/\w|\d/)) === null ||
  _a === void 0
    ? void 0
    : _a.length);
};
// based on code from Mathieu Jouhet - 07/03/2023
// at https://observablehq.com/@daformat/highlighting-html-text
export class Highlighter {
  constructor({
    root,
    tokens = [],
    defaultClassName = 'highlight',
    debug = false,
  }) {
    const defaultOptions = {
      isWordMatched: false,
      isCaseMatched: false,
    };
    this.root = root;
    this.tokens = typeof tokens === 'string' ? [{ text: tokens }] : tokens;
    this.defaultClassName = defaultClassName;
    this.state = {};
    this.debug = debug;
    this.matches = [];
    this.perfs = [];
    this.createdElements = [];
    this.options = defaultOptions;
  }
  setTokens(tokens) {
    this.tokens = tokens;
  }
  highlight(options) {
    if (options)
      this.options = Object.assign(Object.assign({}, this.options), options);
    this.matches = [];
    this.state = {};
    this.tokens.forEach((token) => (this.state[token.text] = {}));
    const t1 = performance.now();
    this.walk(this.root);
    const t2 = performance.now();
    this.perfs.push({ event: 'Search text', time: t2 - t1 });
    const t3 = performance.now();
    this.addBlocks();
    const t4 = performance.now();
    this.perfs.push({ event: 'Highlight text', time: t4 - t3 });
  }
  addBlocks() {
    var _a;
    const highlightsWrapper = document.createElement('hl-wrapper');
    this.createdElements.push(highlightsWrapper);
    Object.entries({
      direction: `ltr`,
      zIndex: `0`,
      float: `left`,
      display: `inline`,
      width: `0px`,
      height: `0px`,
      top: `0px`,
      left: `0px`,
      position: `relative`,
      visibility: `visible`,
      overflow: `visible`,
    }).forEach(([key, value]) => (highlightsWrapper.style[key] = value));
    highlightsWrapper.classList.add(`${this.defaultClassName}-wrapper`);
    (_a = this.root.parentNode) === null || _a === void 0
      ? void 0
      : _a.insertBefore(highlightsWrapper, this.root);
    // reverse so the previous match offset don't change when wrapping the result
    this.matches.reverse().forEach((match) => {
      const className = match.token.className || this.defaultClassName;
      const range = this.createRange(match);
      const rects = Array.from(range.getClientRects(), (rect) => rect.toJSON());
      rects.forEach((_rect) => {
        const element = document.createElement('div');
        this.createdElements.push(element);
        const { x, y, ...rect } = _rect;
        var boxRectangle = highlightsWrapper.getBoundingClientRect();
        var left = x - boxRectangle.left;
        var top = y - boxRectangle.top;
        var borderWidth = parseInt(
          window.getComputedStyle(highlightsWrapper).borderTopWidth,
          10
        );
        left -= borderWidth;
        top -= borderWidth;
        element.style.width = rect.width + 'px';
        element.style.height = rect.height + 'px';
        element.style.left = left + 'px';
        element.style.top = top + 'px';
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        element.classList.add(className);
        highlightsWrapper.appendChild(element);
      });
    });
  }
  createRange({ startNode, startOffset, endNode, endOffset }) {
    const range = new Range();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    return range;
  }
  removeHighlight() {
    const t1 = performance.now();
    this.createdElements.reverse().forEach((element) => element.remove());
    const t2 = performance.now();
    this.perfs.push({ event: 'Remove highlights', time: t2 - t1 });
  }
  walk(node) {
    let currentParent = undefined;
    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
      const current = treeWalker.currentNode;
      const parent = current.parentElement;
      if (parent) {
        const display = getComputedStyle(parent).display;
        if (
          !['', 'contents', 'inline', 'inline-block'].includes(display) &&
          currentParent !== parent
        ) {
          this.tokens.forEach((token) =>
            this.resetState(this.state[token.text])
          );
          currentParent = parent;
        }
      }
      this.search(current);
    }
  }
  search(node) {
    const text = node.textContent;
    if (!text) return;
    const shouldMatchWord = this.options.isWordMatched;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      for (let token of this.tokens) {
        const state = this.state[token.text];
        const next = `${state.current || ''}${char}`.replace(/\s+/g, ' ');
        const commonArgs = [state, node, i, next, token];
        if (next === token.text) {
          const matchesWord = (text) => {
            const nextChar = text[i + 1];
            return !wordLike(nextChar);
          };
          if (!shouldMatchWord || matchesWord(text)) {
            this.transitionState(StateTransition.match, ...commonArgs);
          } else {
            this.transitionState(StateTransition.empty, ...commonArgs);
          }
        } else {
          const pos = token.text.indexOf(next);
          const isFound = pos === 0;
          const matchesWord = (next, text) => {
            const prevChar = text[i - 1];
            const isSingleChar = next.length === 1;
            return !isSingleChar || !wordLike(prevChar);
          };
          const qualifies = !shouldMatchWord || matchesWord(next, text);
          if (isFound && qualifies) {
            this.transitionState(StateTransition.valid, ...commonArgs);
          } else {
            this.transitionState(StateTransition.empty, ...commonArgs);
          }
        }
      }
    }
  }
  transitionState(type, state, node, index, next, token) {
    let debug = `next: "${next}"`;
    switch (type) {
      case StateTransition.empty:
        debug += ' -> empty state';
        this.resetState(state);
        break;
      case StateTransition.valid:
        debug += ' -> valid state';
        if (!state.current || state.current.length === 0) {
          state.startNode = node;
          state.startOffset = index;
        }
        state.current = next;
        break;
      case StateTransition.match:
        const isSingleChar = token.text.length === 1;
        const startNode = isSingleChar ? node : state.startNode;
        const startOffset = isSingleChar ? index : state.startOffset;
        if (startNode && startOffset !== undefined)
          this.matches.push({
            token: token,
            startNode,
            startOffset,
            endNode: node,
            endOffset: index + 1,
          });
        debug +=
          `Found match!\n` +
          `startOffset: ${startOffset} - in "${
            startNode === null || startNode === void 0
              ? void 0
              : startNode.textContent
          }"\n` +
          `endOffset: ${index + 1} - in "${node.textContent}"`;
        this.resetState(state);
        break;
      default:
        break;
    }
    if (this.debug) console.log(debug);
  }
  resetState(state) {
    delete state.current;
    delete state.startNode;
    delete state.startOffset;
  }
}
