import { useContext, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'
import EpiteleteHtml from "epitelete-html";

/** htmlMap - Optional customised html map */
export default function usePkImport( docSetBookId, usfmText, htmlMap ) {
  const [loading,setLoading] = useState(true)
  const [done,setDone] = useState(false)
  const [org, repoStr] = docSetBookId?.split('/') ?? []
  const [lang, abbr] = repoStr?.split('_') ?? []
  const docSetId = `${org}/${repoStr}`

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
      proskomma.importDocument(
        { org, lang, abbr },
        "usfm",
        usfmText
      )
    }

    if (usfmText) {
      if (proskomma) {
        if (!pkCache[docSetBookId]) {
          doImportPk()
          const query = `{ documents { id bookCode: header( id: "bookCode") } }`
          const result = proskomma.gqlQuerySync(query)
          const docId = result.data.documents.filter(d=> d.bookCode === 'TIT')[0].id
          addPkCache(docSetBookId,docId)
        }
        setLoading(false)
      }
    }
  }, [docSetBookId,usfmText,pkCache,proskomma])

  // monitor the epCache and create Epitelete instances as needed
  useDeepCompareEffect(() => {
    const addEpCache = (key, obj) => setEpCache({ [key]: obj, ...epCache })
    if (!loading && proskomma) {
      if (!epCache[docSetId]) {
        const [tmpOrg, tmpRepoStr] = docSetId?.split('/') ?? []
        const tmpDocSetId = `${tmpOrg}_${tmpRepoStr}`
        const _ep = new EpiteleteHtml({ 
          proskomma,
          docSetId: tmpDocSetId,
          htmlMap,
          options: { historySize: 100 }
        })
        addEpCache(docSetId,_ep)
      }
      setDone(true)
    }
  }, [docSetId,epCache,proskomma,htmlMap,loading])
  
  return { loading, done }
}
