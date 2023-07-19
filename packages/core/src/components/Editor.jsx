import PropTypes from 'prop-types'
import EditorPack from "./EditorHeadless"
import { EditorToolbar } from './EditorToolbar';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

function Editor({
  onSave,
  epiteleteHtml,
  sourceId,
  bookId,
  verbose,
  onRenderToolbar,
  reference,
  onReferenceSelected,
  scrollLock,
  scrollDelay,
  children,
  defaultOptions,
}) {
  const props = {
    sourceId,
    onSave,
    epiteleteHtml,
    bookId,
    verbose,
    reference,
    setReference: onReferenceSelected,
    scrollLock,
    scrollDelay,
    children,
    defaultOptions,
  };
  return (
    <EditorPack.Container {...props}>
      <EditorToolbar showToggles={false} onRenderToolbar={onRenderToolbar} />
      <EditorContainer>
        <EditorPack.Main/>
      </EditorContainer>
    </EditorPack.Container>
  );
}

Editor.propTypes = {
  /** Method to call when save button is pressed */
  onSave: PropTypes.func,
  /** Instance of EpiteleteHtml class */
  epiteleteHtml: PropTypes.any,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
  /** Book, chapter, verse to scroll to and highlight */
  bcvSyncRef: PropTypes.shape({
    syncSrcId: PropTypes.string,
    bookId: PropTypes.string,
    chapter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    verse: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),
  /** Optional callback - for extending the toolbar */
  onRenderToolbar: PropTypes.func,
  /** Callback triggered when a verse is clicked on */
  onReferenceSelected: PropTypes.func,
}

Editor.defaultProps = {
  verbose: false
}

const EditorContainer = styled(Box)`
  background-color: white;
  p.p {
    margin: 0;
    padding: 1em 0.5em;
    line-height: 1.4;
    font-family: sans-serif;
  }
  span.mark:is(.verses, .chapter) {
    display: inline-block;
    visibility: hidden;
  }
  span.mark:is(.verses, .chapter):after {
    content: attr(data-atts-number);
    position: relative;
    visibility: visible;
    display: inline-flex;
    color: #000;
  }
  span.mark.chapter {
    font-size: 1.2em;
    font-weight: 600;
    margin-right: 0.1em;
  }
  span.mark.verses {
    font-size: 0.7em;
    font-weight: 600;
    vertical-align: top;
    margin-right: 0.2em;
  }
  .highlight {
    background-color: rgb(255 235 0 / 50%);
    border-radius: 3px;
    mix-blend-mode: initial;
    box-shadow: 0px 0px 0px 1px rgb(255 235 0), 0px 0px 0px 0px rgb(255 235 0);
  }
  div[contenteditable='true']:focus-within {
    outline-style: solid;
    outline: rgb(0 0 0 / 50%) 1px;
    border-radius: 0.3em;
    outline-style: dashed;
    outline-width: 0.05em;
  }
`;

export default Editor;
