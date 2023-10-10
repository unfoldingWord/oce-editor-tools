import { useContext } from "react";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'

export default function useUnsavedDataState() {

  const {
    state: { 
      epCache,
    },
    actions: {
      getRepoUID
    },

  } = useContext(LocalPkCacheContext)

  const hasUnsavedData = (repoIdStr, langIdStr, bookId) =>{
    let retVal = false
    const uId = getRepoUID(repoIdStr,langIdStr)
    if (epCache && epCache[uId]) {
      const epUndoInx = epCache[uId]?.history[bookId]?.undoInx
      const epLastSaveUndoInx = epCache[uId]?.history[bookId]?.lastSaveUndoInx
      retVal = ((epUndoInx !== null) && (epLastSaveUndoInx !== epUndoInx)) || false
    }
    return retVal
  }
 
  return { hasUnsavedData }
}
