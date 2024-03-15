import { forwardRef } from "react";
import DOMPurify from 'dompurify'

// Especially analyse the ltr/rtl handling in the code from duvemeister

export const WebPreviewComponent = forwardRef(({
    style,
    webCss,
    html,
}, ref) => {
  return (
    <>
      <style type="text/css">{webCss}</style>
      <div id="web-preview" style={style} dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html, {ADD_ATTR: ['target']}),
      }} ref={ref}></div>
    </>
  )
})
