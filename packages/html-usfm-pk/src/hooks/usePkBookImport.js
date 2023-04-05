import { useContext, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'
import EpiteleteHtml from "epitelete-html";

/** htmlMap - Optional customised html map */
export default function usePkBookImport( repoIdStr, langIdStr, bookId, usfmText, htmlMap ) {
  const [loading,setLoading] = useState(true)
  const [done,setDone] = useState(false)

  const {
    state: { 
      pk: proskomma, 
      pkCache,
      epCache,
    }, 
    actions: {
      setPkCache,
      setEpCache,
      getRepoUID
    } 
  } = useContext(LocalPkCacheContext)

  // monitor the pkCache and import when usfmText is available
  useDeepCompareEffect(() => {
    const repoLangStr = getRepoUID(repoIdStr, langIdStr) 
    async function doQuery() {
      const addPkCache = (key, str) => setPkCache({ [key]: str, ...pkCache })
      const bookCode = bookId?.toUpperCase()
      const query = `{ documents { id bookCode: header( id: "bookCode") } }`
      const result = await proskomma.gqlQuerySync(query)
      const docId = result.data.documents.filter(d=> d.bookCode === bookCode)[0].id
      addPkCache(repoLangStr,docId)
    }
    async function doImportPk() {
      await proskomma.importDocument(
        { repoIdStr: repoLangStr },
        "usfm",
        usfmText
      )
      await doQuery()
      setLoading(false)
    }

    if ((typeof repoIdStr === "string") && usfmText && proskomma) {
      if (!pkCache[repoLangStr]) {
        doImportPk()
      }
    }
  }, [repoIdStr,usfmText,pkCache,proskomma])

  // monitor the epCache and create Epitelete instances as needed
  useDeepCompareEffect(() => {
    const addEpCache = (key, obj) => setEpCache({ [key]: obj, ...epCache })
    if (!loading && proskomma) {
      const repoLangStr = getRepoUID(repoIdStr, langIdStr)
  
      if (repoLangStr && !epCache[repoLangStr]) {
        const _ep = new EpiteleteHtml({ 
          proskomma,
          docSetId: repoLangStr,
          htmlMap,
          options: { historySize: 100 }
        })
        addEpCache(repoLangStr,_ep)
      }
      setDone(true)
    }
  }, [epCache,proskomma,htmlMap,loading])
  
  return { loading, done }
}
