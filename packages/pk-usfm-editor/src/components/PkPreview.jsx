import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { LocalPkCacheContext } from '../context/LocalPkCacheContext';
import { SofriaRenderFromProskomma } from 'proskomma-json-tools';
import sofria2WebActions from '../renderer/sofria2web';
import { renderers } from '../renderer/render2react';
import {
  Typography,
  Grid,
} from '@mui/material';

export default function PkPreview(props) {
  const {
    docSetId, bookId, verbose,
  } = props;

  const [scriptureData, setScriptureData] = useState({
    menuQuery: null,
    renderedDocId: null,
    rendered: null,
    showWordAtts: false,
    showTitles: true,
    showHeadings: true,
    showIntroductions: true,
    showFootnotes: true,
    showXrefs: true,
    showParaStyles: true,
    showCharacterMarkup: true,
    showChapterLabels: true,
    showVersesLabels: true,
    updatedAtts: false,
  });

  const [tmpOrg, tmpRepoStr] = docSetId?.split('/') ?? []
  const useDocSetId = `${tmpOrg}_${tmpRepoStr}`
  const docSetBookId = `${docSetId}/${bookId}`

  const [docIdFromCache, setDocIdFromCache] = useState(false)

  const {
    state: { pk, pkCache },
  } = useContext(LocalPkCacheContext);

  useEffect(() => {
    if (pk != null) {
      if (pkCache[docSetBookId] && !docIdFromCache) {
        setDocIdFromCache(pkCache[docSetBookId])
      }
    }
  },[pk, pkCache, docSetBookId, docIdFromCache]);

  useEffect(() => {
    if (docIdFromCache && (useDocSetId != null)) {
      if (
        docIdFromCache !== scriptureData.renderedDocId ||
        scriptureData.updatedAtts
      ) {
        const renderer = new SofriaRenderFromProskomma({
          proskomma: pk,
          actions: sofria2WebActions,
        });

        const config = {
          showWordAtts: scriptureData.showWordAtts,
          showTitles: scriptureData.showTitles,
          showHeadings: scriptureData.showHeadings,
          showIntroductions: scriptureData.showIntroductions,
          showFootnotes: scriptureData.showFootnotes,
          showXrefs: scriptureData.showXrefs,
          showParaStyles: scriptureData.showParaStyles,
          showCharacterMarkup: scriptureData.showCharacterMarkup,
          showChapterLabels: scriptureData.showChapterLabels,
          showVersesLabels: scriptureData.showVersesLabels,
          renderers,
        };
        const output = {};
        try {
          renderer.renderDocument({
            docId: docIdFromCache,
            config,
            output,
          });
          console.log(output)
        } catch (err) {
          if (verbose) console.log('Renderer', err);
          throw err;
        }
        setScriptureData({
          ...scriptureData,
          renderedDocId: docIdFromCache,
          rendered: output.paras,
        })

      }
    }
  }, [pk, useDocSetId, docIdFromCache, scriptureData, verbose]);

  return (
    <Grid container style={{ fontFamily: 'Arial' }}>
      <Grid key={2} item xs={12}>
        {scriptureData.rendered && docIdFromCache === scriptureData.renderedDocId ? (
          <>{scriptureData.rendered}</>
        ) : (
          <Typography>{'LOADING'}...</Typography>
        )}
      </Grid>
    </Grid>
  );
}

PkPreview.propTypes = {
  /** docSetId identifies a set of documents in proskomma, usually contains org and language code */
  docSetId: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
};

PkPreview.defaultProps = {
  verbose: false,
};
