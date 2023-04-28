import React from 'react'
import PropTypes from 'prop-types'
import { useMd2HtmlPreview } from "@oce-editor-tools/core"

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
    <div>
      {done ? <div dangerouslySetInnerHTML={{__html: renderedData}} /> : 'LOADING'}
    </div>
  )
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
