import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useBookPreviewRenderer from "../hooks/useBookPreviewRenderer";
import { Proskomma } from 'proskomma-core'

export default function BookPreview(props) {
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
  const [renderedData,setRenderedData] = useState()
  const [done,setDone] = useState(false)
  const [imported,setImported] = useState(false)

  const bookCode = bookId?.toUpperCase()

  const { ready, doRender } = useBookPreviewRenderer({
    pk, 
    docId, 
    bookId,
  })

  useEffect(() => {
    if ((pk != null) && (usfmText != null)) {
      pk.importDocument(
        {lang: 'xxx', abbr: 'XXX'}, // doesn't matter...
        "usfm",
        usfmText
      )
      setImported(true)
    }
  },[pk, usfmText])

  useEffect(() => {
    async function doImportPk() {
      const query = `{ documents { id bookCode: header( id: "bookCode") } }`
      const result = await pk.gqlQuerySync(query)
      const _docId = result.data.documents.filter(d=> d.bookCode === bookCode)[0].id
      setDocId(_docId)
    }

    if ((pk != null) && (imported)) {
      if (!ready) {
        try {
          doImportPk()
          setDone(true)
        } catch (e) {
            console.log(e)
        }
      } else {
        setRenderedData(doRender({renderFlags, extInfo, verbose}))
      }
    }
  },[bookCode, pk, imported, doRender, extInfo, renderFlags, verbose, ready]);

  return (
    <div>
        {(done && renderedData) ? <>{renderedData}</> : `LOADING`}
    </div>
  );
}

BookPreview.propTypes = {
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

BookPreview.defaultProps = {
  verbose: false,
};
