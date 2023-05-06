import React, {useCallback, useLayoutEffect} from "react";
import { Previewer } from 'pagedjs';

export default function usePagedJsPreview({component, embed}) {
    
  const previewPDF = useCallback(() => {
    const previewer = new Previewer();

    const callback = (flow) => {
      console.log("preview rendered, total pages", flow.total, { flow });
    };

    let options;
    if (embed) {
      previewer.preview(
        document.querySelector('#content').innerHTML,
        [],
        document.querySelector('#preview')
      ).then(flow => {
        callback(flow);
        document.querySelector('#content').style.display = 'none';
      });
    } else {
      previewer.preview(options).then(callback);
    };
  }, [embed]);

  useLayoutEffect(() => {
    previewPDF();
  }, [previewPDF, embed]);

  return (
    <>
      <div id="content">
        {component}
      </div>
      <div id="preview"></div>
    </>
  );
};