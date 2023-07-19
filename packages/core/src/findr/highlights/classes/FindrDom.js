import { Highlighter } from './Highlighter';
import { getTokens } from '../helpers';
import { findrDom } from '..';
export class FindrDom {
  constructor({
    source,
    defaultClassName = 'highlight',
    debug = false,
    metadata,
  }) {
    this.source = source;
    this.highlighter = new Highlighter({
      root: source,
      defaultClassName,
      debug,
    });
    this.metadata = metadata;
    this.observers = [];
  }
  setObservers() {
    const resetHighlight = () => {
      var _a;
      this.highlighter.removeHighlight();
      if (
        (_a = this.highlighter.tokens) === null || _a === void 0
          ? void 0
          : _a.length
      )
        this.find({
          target: this.target,
          replacement: this.replacement,
          options: this.options,
          metadata: this.metadata,
        });
    };
    const robserver = new ResizeObserver(resetHighlight);
    const mobserver = new MutationObserver(resetHighlight);
    this.observers = [robserver, mobserver];
    robserver.observe(this.source);
    mobserver.observe(this.source, {
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }
  unsetObservers() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
  setOptions(options) {
    this.options = options;
  }
  setTarget(target) {
    this.target = target;
  }
  find({ target, replacement, replacementKeys, metadata, options }) {
    var _a;
    this.highlighter.removeHighlight();
    if (target !== null && target !== undefined) this.setTarget(target);
    if (!this.target) return;
    this.replacement = replacement;
    if (metadata) {
      this.metadata = metadata;
    }
    if (options) {
      this.setOptions(options);
    }
    const response = findrDom({
      source: this.source,
      target: this.target,
      replacement,
      replacementKeys,
      metadata,
      config: this.options,
    });
    const tokens = getTokens(response.results);
    this.highlighter.setTokens(tokens);
    if (options === null || options === void 0 ? void 0 : options.highlights) {
      const { isWordMatched, isCaseMatched } = this.options || {};
      this.highlighter.highlight({ isWordMatched, isCaseMatched });
      if (
        !((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length)
      )
        this.setObservers();
    }
    return response;
  }
  clean() {
    this.unsetObservers();
    this.highlighter.removeHighlight();
  }
}
