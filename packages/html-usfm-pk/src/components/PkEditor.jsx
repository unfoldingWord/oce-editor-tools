import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useDeepCompareEffect } from "use-deep-compare";
import { Editor } from "html-usfm-core"
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'

export default function PkEditor( props) {
  const {
    repoIdStr, langIdStr
  } = props;
  const [epiteleteHtml, setEpiteleteHtml] = useState();

  const {
    state: { epCache },
    actions: { getRepoUID }
  } = useContext(LocalPkCacheContext)

  useEffect(() => {
    console.log(epiteleteHtml)
  }, [epiteleteHtml]);

  useEffect(() => {
    console.log(repoIdStr)
  }, [repoIdStr]);

  useDeepCompareEffect(() => {
    console.log(epCache)
    console.log(repoIdStr)
    console.log(langIdStr)
    const repoLangStr = getRepoUID(repoIdStr,langIdStr)
    if (epCache[repoLangStr]) {
      setEpiteleteHtml(epCache[repoLangStr])
    }
  }, [epCache, repoIdStr, langIdStr]);

  const editorProps = {
    ...props,
    epiteleteHtml,
  };

  return (<Editor { ...editorProps } />)
};

PkEditor.propTypes = {
  /** Method to call when save button is pressed */
  onSave: PropTypes.func,
  /** Callback triggered when a verse is clicked on */
  onReferenceSelected: PropTypes.func,
  /** repoIdStr identifies a set of documents in proskomma, usually contains org and language code */
  repoIdStr: PropTypes.string,
  /** langIdStr identifies the language of a set of documents in proskomma */
  langIdStr: PropTypes.string,
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
