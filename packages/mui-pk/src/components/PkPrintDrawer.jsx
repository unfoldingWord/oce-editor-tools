import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { usePkBookPreviewRenderer } from "@oce-editor-tools/base"
import { PrintDrawer } from "@oce-editor-tools/mui-core"
import { LocalPkCacheContext } from '../context/LocalPkCacheContext';

const defaultIncludeNames = [
  'titles',
  'headings',
  'introductions',
  'footnotes',
  'xrefs',
  'paraStyles',
  'characterMarkup',
  'chapterLabels',
  'versesLabels',
];

export default function PkPrintDrawer({
  openPrintDrawer,
  onClosePrintDrawer,
  repoIdStr, 
  langIdStr, 
  bookId, 
  verbose = false,
  bcvFilter, 
  extInfo, 
  renderFlags: _renderFlags,
  renderStyles,
  printFont,
  printFontSize,
  printLineHeight,
}) {

  // const allNames = [
  //   'wordAtts',
  //   'titles',
  //   'headings',
  //   'introductions',
  //   'footnotes',
  //   'xrefs',
  //   'paraStyles',
  //   'characterMarkup',
  //   'chapterLabels',
  //   'versesLabels',
  // ];

  const [docIdFromCache, setDocIdFromCache] = useState(undefined)
  // eslint-disable-next-line no-unused-vars
  const [includedNames, setIncludedNames] = useState(defaultIncludeNames);

  const {
    state: { pk, pkCache },
    actions: { getRepoUID }
  } = useContext(LocalPkCacheContext);

  // const makeIncludedFlags = (allN, includedN) => {
  //   const ret = {};
  //   for (const name of allN) {
  //     ret[`show${name.substring(0, 1).toUpperCase()}${name.substring(1)}`] =
  //       includedN.includes(name);
  //   }
  //   return ret;
  // };

  const { ready, doRender } = usePkBookPreviewRenderer({
    pk, 
    docId: docIdFromCache, 
    bookId,
    renderStyles
    // renderFlags: makeIncludedFlags(allNames, includedNames),
  })

  useEffect(() => {
    if (pk != null) {
      if (!ready) {
        try {
          const repoLangStr = getRepoUID(repoIdStr,langIdStr)
          if (pkCache[repoLangStr] && pkCache[repoLangStr][bookId] && !docIdFromCache) {
            setDocIdFromCache(pkCache[repoLangStr][bookId])
          }

        } catch (e) {
          console.log(e)
        }
      }
    }
  },[pk, pkCache, docIdFromCache, repoIdStr, langIdStr, ready, getRepoUID, bookId]);


  const handleRender = () => {
    const renderText = doRender({_renderFlags, extInfo, verbose, htmlRender: true})
    return renderText
  }

  const previewProps = {
    openPrintDrawer,
    onClosePrintDrawer,
    onRenderContent: handleRender,
    printFont,
    printFontSize,
    printLineHeight
  }

  return (
    <PrintDrawer {...previewProps} />
  );
}

PkPrintDrawer.propTypes = {
  /** PkPrintDrawer is open when this is set true */
  openPrintDrawer: PropTypes.bool,
  /** handle the needed actions, when modal is closed */
  onClosePrintDrawer: PropTypes.func,
  /** repoIdStr identifies a set of documents in proskomma, usually contains org and language code */
  repoIdStr: PropTypes.string,
  /** langIdStr identifies the language of a set of documents in proskomma */
  langIdStr: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Rendering flags */
  renderFlags: PropTypes.objectOf(PropTypes.bool),
  /** Extended info - to be displayed for some verses */
  extInfo: PropTypes.any,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
  /** Print font */
  printFont: PropTypes.string,
  /** Print font size */
  printFontSize: PropTypes.string,
  /** Print line height */
  printLineHeight: PropTypes.string,
};
