import { useContext, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'
import EpiteleteHtml from "epitelete-html";

/** htmlMap - Optional customised html map */
export default function usePkImport( docSetBookId, usfmText, htmlMap ) {
  const [loading,setLoading] = useState(true)
  const [done,setDone] = useState(false)
  const [org, repoStr, bookId] = docSetBookId?.split('/') ?? []
  const [lang, abbr] = repoStr?.split('_') ?? []
  const docSetId = `${org}/${repoStr}`

  const {
    state: { 
      pkHook, 
      pkCache,
      epCache,
    }, 
    actions: {
      setPkCache,
      setEpCache,
    } 
  } = useContext(LocalPkCacheContext)

  const { proskomma } = pkHook ?? {}; 

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
          addPkCache(docSetBookId,bookId)
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
        const _ep = new EpiteleteHtml({ 
          proskomma,
          docSetId,
          htmlMap,
          options: { historySize: 100 }
        })
        addEpCache(docSetId,_ep)
      }
      setDone(true)
    }
  }, [docSetId,epCache,proskomma,loading])
  
  return { loading, done }
}
