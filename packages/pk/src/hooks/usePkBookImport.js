import { useContext, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'
import EpiteleteHtml from "epitelete-html";

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
      addPkCache,
      addEpCache,
      getRepoUID
    } 
  } = useContext(LocalPkCacheContext)

  // monitor the pkCache and import when usfmText is available
  useDeepCompareEffect(() => {
    function doImportPk(repoIdStr) {
      const res = proskomma.importDocument(
        { repoIdStr },
        "usfm",
        usfmText
      )
      if (res.id !== undefined) {
        addPkCache(repoIdStr,res.id)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    if ((typeof repoIdStr === "string") && usfmText && proskomma) {
      const repoLangStr = getRepoUID(repoIdStr, langIdStr) 
      if (!pkCache[repoLangStr]) {
        doImportPk(repoLangStr)
      } else {
        setLoading(false)
      }
    }
  }, [repoIdStr,usfmText,pkCache,proskomma])

  // monitor the epCache and create Epitelete instances as needed
  useDeepCompareEffect(() => {
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
