export const hasUnsavedData = (epiteleteHtml, bookId) =>{
  let retVal = false
  if (epiteleteHtml) {
    const bId = bookId.toUpperCase()
    retVal = epiteleteHtml.canSavePerf(bId)
  }
  return retVal
}
