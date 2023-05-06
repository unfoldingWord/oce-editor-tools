import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useBookPreviewRenderer } from "@oce-editor-tools/core";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext';
import {
  Typography,
  Grid,
} from '@mui/material';

export default function PkPreview(props) {
  const {
    repoIdStr, langIdStr, bookId, verbose, extInfo, renderFlags,
  } = props;

  const [docIdFromCache, setDocIdFromCache] = useState(undefined)
  const [renderedData,setRenderedData] = useState()
  const [done,setDone] = useState(false)

  const {
    state: { pk, pkCache },
    actions: { getRepoUID }
  } = useContext(LocalPkCacheContext);

  const { ready, doRender } = useBookPreviewRenderer({
    pk, 
    docId: docIdFromCache, 
    bookId,
    renderFlags,
    extInfo, 
    verbose
  })

  useEffect(() => {
    if (pk != null) {
      if (!ready) {
        try {
          const repoLangStr = getRepoUID(repoIdStr,langIdStr)
          if (pkCache[repoLangStr] && !docIdFromCache) {
            setDocIdFromCache(pkCache[repoLangStr])
          }
          setDone(true)
        } catch (e) {
          console.log(e)
        }
      } else {
        const _renderedData = doRender({renderFlags, extInfo, verbose})
        setRenderedData(_renderedData)
      }
    }
  },[pk, doRender, extInfo, renderFlags, verbose, ready, getRepoUID, repoIdStr, langIdStr, pkCache, docIdFromCache]);


  return (
    <Grid container style={{ fontFamily: 'Arial' }}>
      <Grid key={2} item xs={12}>
        {(done && renderedData) ? <>{renderedData}</> : <Typography>{'LOADING'}...</Typography>}
      </Grid>
    </Grid>
  );
}

PkPreview.propTypes = {
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
};

PkPreview.defaultProps = {
  verbose: false,
};
