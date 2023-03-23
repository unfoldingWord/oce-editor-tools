import { useContext } from "react";
import { LocalPkCacheContext } from '../context/LocalPkCacheContext'

export default function useUnsavedDataState() {

  const {
    state: { 
      epCache,
    }
  } = useContext(LocalPkCacheContext)

  const hasUnsavedData = (docSetId, bookId) =>{
    let retVal = false
    if (epCache && epCache[docSetId]) {
      const epUndoInx = epCache[docSetId]?.history[bookId]?.undoInx
      const epLastSaveUndoInx = epCache[docSetId]?.history[bookId]?.lastSaveUndoInx
      retVal = ((epUndoInx !== null) && (epLastSaveUndoInx !== epUndoInx)) || false
    }
    return retVal
  }
 
  return { hasUnsavedData }
}
