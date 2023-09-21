// eslint-disable-next-line no-unused-vars
import React,
{ useState, useEffect }
from 'react'
import usePkBookPreviewRenderer from "./usePkBookPreviewRenderer"
import { Proskomma } from 'proskomma-core'

export default function useUsfmPreviewRenderer(props) {
  const {
    usfmText,
    verbose, 
    extInfo, 
    renderFlags,
    htmlRender
  } = props

  const [docId, setDocId] = useState()
  // eslint-disable-next-line no-unused-vars
  const [pk,setPk] = useState(new Proskomma())
  const [renderedData,setRenderedData] = useState()
  const [bookId,setBookId] = useState()
  const [imported,setImported] = useState(false)

  const { ready, doRender } = usePkBookPreviewRenderer({
    pk, 
    docId, 
    bookId,
  })

  useEffect(() => {
    if ((pk != null) && (usfmText != null) && !imported) {
      const res = pk.importDocument(
        {lang: 'xxx', abbr: 'XXX'}, // doesn't matter...
        "usfm",
        usfmText
      )
      if (res.id !== undefined) {
        setDocId(res.id)
        setImported(true)
      }
    }
  },[imported, pk, usfmText])

  useEffect(() => {
    async function doQueryPk() {
      const query = `{ documents { id bookCode: header( id: "bookCode") } }`
      const result = await pk.gqlQuerySync(query)
      setBookId(result?.data?.documents[0]?.bookCode)
    }

    if ((pk != null) && (imported)) {
      if (!ready) {
        try {
          doQueryPk()
        } catch (e) {
          console.log(e)
        }
      } else {
        setRenderedData(doRender({renderFlags, extInfo, verbose, htmlRender}))
      }
    }
  },[pk, imported, doRender, extInfo, renderFlags, verbose, ready, htmlRender])

  return {renderedData, ready}
}

