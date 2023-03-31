import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { usePreview } from "html-usfm-core";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext';
import {
  Typography,
  Grid,
} from '@mui/material';

export default function PkPreview(props) {
  const {
    repoIdStr, bookId, verbose, extInfo, renderFlags,
  } = props;

  const repoBookId = `${repoIdStr}/${bookId}`

  const [docIdFromCache, setDocIdFromCache] = useState(undefined)

  const {
    state: { pk, pkCache },
  } = useContext(LocalPkCacheContext);

  const { done, renderedData } = usePreview({
    pk, 
    docId: docIdFromCache, 
    bookId,
    renderFlags,
    extInfo, 
    verbose
  })

  useEffect(() => {
    if (pk != null) {
      if (pkCache[repoBookId] && !docIdFromCache) {
        setDocIdFromCache(pkCache[repoBookId])
      }
    }
  },[pk, done, pkCache, repoBookId, docIdFromCache]);

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
