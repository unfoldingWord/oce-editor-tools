import { useContext } from "react";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'

export default function useUnsavedDataState() {

  const {
    state: { 
      epCache,
    }
  } = useContext(LocalPkCacheContext)

  const hasUnsavedData = (repoIdStr, bookId) =>{
    let retVal = false
    if (epCache && epCache[repoIdStr]) {
      const epUndoInx = epCache[repoIdStr]?.history[bookId]?.undoInx
      const epLastSaveUndoInx = epCache[repoIdStr]?.history[bookId]?.lastSaveUndoInx
      retVal = ((epUndoInx !== null) && (epLastSaveUndoInx !== epUndoInx)) || false
    }
    return retVal
  }
 
  return { hasUnsavedData }
}
