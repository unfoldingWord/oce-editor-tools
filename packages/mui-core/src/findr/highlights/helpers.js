export function getNodeText(node) {
  let text = '';
  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
  let prevNode;
  while (treeWalker.nextNode()) {
    const current = treeWalker.currentNode;
    const { nodeType } = current;
    if (
      (prevNode === null || prevNode === void 0
        ? void 0
        : prevNode.nodeName) === 'BR' ||
      ((prevNode === null || prevNode === void 0
        ? void 0
        : prevNode.nodeType) === 1 &&
        window.getComputedStyle(prevNode, null).display === 'block')
    )
      if (text[text.length - 1] !== `\n`) text += `\n`;
    if (nodeType === 3) {
      text += current.textContent;
    }
    prevNode = current;
  }
  return text.trim();
}
export const getTokens = (results) => {
  const resultsStrings = [...new Set(results.map((r) => r.match))];
  const tokens = resultsStrings.map((result) => ({ text: result }));
  return tokens;
};
