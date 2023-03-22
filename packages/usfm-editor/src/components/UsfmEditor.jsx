import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { usfm2perf } from '../helpers/usfm2perf'
import EpiteleteHtml from "epitelete-html";
import { Editor } from "html-usfm-editor-core"

export default function UsfmEditor( props ) {
  const {
    usfmText, onSave, verbose,
    htmlMap, activeReference, 
    onRenderToolbar, onReferenceSelected 
  } = props;

  const proskomma = null;
  const docSetId = "Xxx/en_xxx" // just dummy values
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line 
  const [ep, setEp] = useState(new EpiteleteHtml({ proskomma, docSetId, htmlMap, options: { historySize: 100 } }))

  useEffect(
    () => {
      async function loadUsfm() {
        const tempPerf = usfm2perf(usfmText)
        await ep.sideloadPerf('XXX', tempPerf)
        setReady(true)
      }
      if ( usfmText && !ready ) loadUsfm();
    }, [usfmText, ready, ep]
  )
 
  const editorProps = {
    epiteleteHtml: ep, 
    bookId: 'XXX',
    onSave,
    verbose,
    activeReference,
    onRenderToolbar,
    onReferenceSelected 
  }

  return (
    <div>
      { ready ? <Editor {...editorProps} /> : 'Loading...'}
    </div>
  )
};

UsfmEditor.propTypes = {
  /** The text in usfm format to load in the editor */
  usfmText: PropTypes.string,
  /** Method to call when save button is pressed */
  onSave: PropTypes.func,
  /** Optional customised html map */
  htmlMap: PropTypes.any,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
  /** Book, chapter, verse to scroll to and highlight */
  activeReference: PropTypes.shape({
    bookId: PropTypes.string,
    chapter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    verse: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  /** Optional callback - for extending the toolbar */
  onRenderToolbar: PropTypes.func,
  /** Callback triggered when a verse is clicked on */
  onReferenceSelected: PropTypes.func,
};

UsfmEditor.defaultProps = {
  verbose: false
}
