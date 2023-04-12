import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePreview } from "@oce-editor-tools/core";
import { Proskomma } from 'proskomma-core'
import {
  Typography,
  Grid,
} from '@mui/material';

export default function UsfmPreview(props) {
  const {
    bookId, 
    usfmText,
    verbose, 
    extInfo, 
    renderFlags,
  } = props;

  const [docId, setDocId] = useState()
  // eslint-disable-next-line no-unused-vars
  const [pk,setPk] = useState(new Proskomma())

  const bookCode = bookId?.toUpperCase()

  const { done, renderedData } = usePreview({
    pk, 
    docId, 
    bookId,
    renderFlags,
    extInfo, 
    verbose
  })

  useEffect(() => {
    function doImportPk() {
      pk.importDocument(
        {lang: 'xxx', abbr: 'XXX'}, // doesn't matter...
        "usfm",
        usfmText
      )
    }
    async function doQuery() {
      const query = `{ documents { id bookCode: header( id: "bookCode") } }`
      const result = await pk.gqlQuerySync(query)
      const _docId = result.data.documents.filter(d=> d.bookCode === bookCode)[0].id
      setDocId(_docId)
    }

    if (pk != null) {
      try {
        doImportPk()
        doQuery()
      } catch (e) {
          console.log(e)
      }
    }
  },[bookCode, pk, usfmText]);

  return (
    <Grid container style={{ fontFamily: 'Arial' }}>
      <Grid key={2} item xs={12}>
        {(done && renderedData) ? <>{renderedData}</> : <Typography>{'LOADING'}...</Typography>}
      </Grid>
    </Grid>
  );
}

UsfmPreview.propTypes = {
  /** The text in usfm format to load in the editor */
  usfmText: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Rendering flags */
  renderFlags: PropTypes.objectOf(PropTypes.bool),
  /** Extended info - to be displayed for some verses */
  extInfo: PropTypes.any,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
};

UsfmPreview.defaultProps = {
  verbose: false,
};
