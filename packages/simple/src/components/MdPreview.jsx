import React from 'react'
import PropTypes from 'prop-types'
import { useMd2HtmlPreview } from "@oce-editor-tools/core"
import {
  Typography,
  Grid,
} from '@mui/material'

export default function MdPreview(props) {
  const {
    mdText,
    verbose 
  } = props

  const { done, renderedData } = useMd2HtmlPreview({
    markupStr: mdText,
    verbose
  })

  return (
    <Grid container style={{ fontFamily: 'Arial' }}>
      <Grid key={2} item xs={12}>
      {done ? <div dangerouslySetInnerHTML={{__html: renderedData}}/> : <Typography>{'LOADING'}...</Typography>}
      </Grid>
    </Grid>
  );
}

MdPreview.propTypes = {
  /** The text in markup format to load in the editor */
  mdText: PropTypes.string,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
}

MdPreview.defaultProps = {
  verbose: false,
}
