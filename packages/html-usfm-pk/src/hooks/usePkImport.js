import { useContext, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'
import EpiteleteHtml from "epitelete-html";

/** htmlMap - Optional customised html map */
export default function usePkImport( repoBookId, usfmText, htmlMap ) {
  const [loading,setLoading] = useState(true)
  const [done,setDone] = useState(false)
  const [org, repoStr, bookId] = repoBookId?.split('/') ?? []
  const [lang, abbr] = repoStr?.split('_') ?? []
  const repoIdStr = `${org}/${repoStr}`

  const bookCode = bookId.toUpperCase()

  const {
    state: { 
      pk: proskomma, 
      pkCache,
      epCache,
    }, 
    actions: {
      setPkCache,
      setEpCache,
    } 
  } = useContext(LocalPkCacheContext)

  // monitor the pkCache and import when usfmText is available
  useDeepCompareEffect(() => {
    const addPkCache = (key, str) => setPkCache({ [key]: str, ...pkCache })
    async function doImportPk() {
      await proskomma.importDocument(
        { org, lang, abbr },
        "usfm",
        usfmText
      )
    }
    async function doQuery() {
      const query = `{ documents { id bookCode: header( id: "bookCode") } }`
      const result = await proskomma.gqlQuerySync(query)
      const docId = result.data.documents.filter(d=> d.bookCode === bookCode)[0].id
      addPkCache(repoBookId,docId)
    }

    if (usfmText) {
      if (proskomma) {
        if (!pkCache[repoBookId]) {
          doImportPk()
          doQuery()
        }
        setLoading(false)
      }
    }
  }, [repoBookId,usfmText,pkCache,proskomma])

  // monitor the epCache and create Epitelete instances as needed
  useDeepCompareEffect(() => {
    const addEpCache = (key, obj) => setEpCache({ [key]: obj, ...epCache })
    if (!loading && proskomma) {
      if (!epCache[repoIdStr]) {
        const [tmpOrg, tmpRepoStr] = repoIdStr?.split('/') ?? []
        const tmpRepoIdStr = `${tmpOrg}_${tmpRepoStr}`
        const _ep = new EpiteleteHtml({ 
          proskomma,
          docSetId: tmpRepoIdStr,
          htmlMap,
          options: { historySize: 100 }
        })
        addEpCache(repoIdStr,_ep)
      }
      setDone(true)
    }
  }, [repoIdStr,epCache,proskomma,htmlMap,loading])
  
  return { loading, done }
}
