import React from 'react'
import PropTypes from 'prop-types'
import useUsfmPreviewRenderer from "../hooks/useUsfmPreviewRenderer"

export default function BookPreview(props) {
  const {
    usfmText,
    verbose, 
    extInfo, 
    renderFlags,
  } = props

  const { renderedData, ready } = useUsfmPreviewRenderer({
    usfmText,
    verbose, 
    extInfo, 
    renderFlags,
  })

  return (
    <div>
      {(ready && renderedData) ? <>{renderedData}</> : `LOADING`}
    </div>
  )
}

BookPreview.propTypes = {
  /** The text in usfm format to load in the editor */
  usfmText: PropTypes.string,
  /** Rendering flags */
  renderFlags: PropTypes.objectOf(PropTypes.bool),
  /** Extended info - to be displayed for some verses */
  extInfo: PropTypes.any,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
}

BookPreview.defaultProps = {
  verbose: false,
}
