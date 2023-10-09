import { useContext, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'
import EpiteleteHtml from "epitelete-html";

export default function usePkBookImport( repoIdStr, langIdStr, bookId, usfmText, htmlMap, options ) {
  const [loading,setLoading] = useState(true)
  const [curLoadingId,setCurLoadingId] = useState()
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
    function doImportPk(repoIdStr,bId) {
      const tmpObj = pkCache[repoIdStr] || {}
      const res = proskomma.importDocument(
        { repoIdStr },
        "usfm",
        usfmText
      )
      if (res.id !== undefined) {
        tmpObj[bId] = res.id
        addPkCache(repoIdStr,tmpObj)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    if ((typeof repoIdStr === "string") && bookId && usfmText && proskomma) {
      const repoLangStr = getRepoUID(repoIdStr, langIdStr) 
      if (pkCache[repoLangStr] && pkCache[repoLangStr][bookId]) {
        setLoading(false)
      } else {
        const repoLangBookIdStr =  `${repoLangStr}${bookId}`
        if (curLoadingId !== repoLangBookIdStr) {
          setCurLoadingId(repoLangBookIdStr)
          doImportPk(repoLangStr,bookId)
        }
      }
    }
  }, [repoIdStr,langIdStr,bookId,usfmText,pkCache,proskomma])

  // monitor the epCache and create Epitelete instances as needed
  useDeepCompareEffect(() => {
    if (!loading && proskomma) {
      const repoLangStr = getRepoUID(repoIdStr, langIdStr)
      // LG: Workaround !!! Now using one Epitelete for each single book
      // Remove the below line in order to have one Epitelete instance handle several books 
      // - and also change all of the references to it, back to use 'repoLangStr' instead 
      const repoLangBookIdStr =  `${repoLangStr}${bookId}`
      // The below line should be used instead, in order to have one Epitelete instance handle several books
      // if (repoLangStr && !epCache[repoLangStr]) {
      if (repoLangStr && !epCache[repoLangBookIdStr]) {
          const _ep = new EpiteleteHtml({ 
          proskomma,
          docSetId: repoLangStr,
          htmlMap,
          options: { historySize: 100, ...options },
        })
        addEpCache(repoLangBookIdStr,_ep)
      }
      setDone(true)
    }
  }, [epCache,proskomma,htmlMap,loading,options])
  
  return { loading, done }
}
