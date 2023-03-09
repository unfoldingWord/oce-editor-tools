import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { useDeepCompareEffect } from "use-deep-compare";
import { Editor } from "html-usfm-editor-core"
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'

export default function PkEditor( props) {
  const {
    docSetId, bookId, activeReference, onReferenceSelected 
  } = props;
  const [epiteleteHtml, setEpiteleteHtml] = useState();

  const {
    state: {
      epCache,
    },
  } = useContext(LocalPkCacheContext)

  useDeepCompareEffect(() => {
    if (epCache[docSetId]) {
      setEpiteleteHtml(epCache[docSetId])
    }
  }, [epCache, docSetId]);

  const editorProps = {
    ...props,
    bookId,
    epiteleteHtml,
    activeReference, 
    onReferenceSelected 
  };

  return (<Editor { ...editorProps } />)
};

PkEditor.propTypes = {
  /** Method to call when save button is pressed */
  onSave: PropTypes.func,
  /** Callback triggered when a verse is clicked on */
  onReferenceSelected: PropTypes.func,
  /** docSetId identifies a set of documents in proskomma, usually contains org and language code */
  docSetId: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
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
  })
};

PkEditor.defaultProps = {
  verbose: false
}
