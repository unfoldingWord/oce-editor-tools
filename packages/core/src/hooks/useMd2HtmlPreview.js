// https://github.com/markdown-it/markdown-it
// markdown-it: 104KB. Powers StackExchange since the CommonMark migration. Follows the CommonMark spec and is now more or less the gold standard; supports syntax extensions; produces secure output by default. Fast; as robust as showdown, but very large. Has a ton of features (e.g. synced scrolling). Is also the basis for http://dillinger.io/.
//
// https://github.com/showdownjs/showdown
// showdown: 28KB. Has comprehensive CommonMark support and was previously the gold standard; is significantly smaller than Markdown-It but slower. it is the basis for pagedown.
//
// https://code.google.com/archive/p/pagedown/
// pagedown: 8KB. Powered StackExchange before the CommonMark migration. It is very robust but missing tables, definition lists, footnotes, etc. In addition to the 8KB converter script, it also offers editor and sanitizer scripts.
//
// https://adamvleggett.github.io/drawdown/
// drawdown: 1.3KB. Broader feature scope than any other lightweight converter; handles most but not all of the CommonMark spec. Not recommended for user editing but very useful for presenting information in web apps. No inline HTML.

import { markup } from '../helpers/drawdown';

console.log(markup)