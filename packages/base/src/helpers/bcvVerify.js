/*
  Given a hierarchical bcv tree structure, for instance:
  const bcvQuery = { 
    book: { 
      act: { },
      tit: {
        ch: { 
          1: { 
            v: { 1: {}, 2: {} } 
          },
          2: {} 
        } 
      } 
    } 
  }

  gets converted to a bcv verify structure, suitable as a help for a simple verification 
  to check if any verse is included in this specification (see function isVerifiedWithBcvStruct).
  The above example results in the following structure:
  {
    bookIds: Set(1) { 'Act' }, // all chapters and verses in the Acts of Apostles are valid
    chIds: Set(1) { 'Tit.2' }, // all verses in chapter 2 in the Letter to Titus are valid
    vIds: Set(2) { 'Tit.1.1', 'Tit.1.2' } // verses 1 and 2 in chapter 1 of the Letter to Titus are valid
  }
*/
export const getBcvVerifyStruct = (bcvFilter) => {
  const retObj = {
    bookIds: new Set(),
    bookIdsInUse: new Set(),
    chIds: new Set(),
    chIdsInUse: new Set(),
    vIds: new Set()
  }
  if (bcvFilter) {
    Object.entries(bcvFilter?.book || {}).forEach(([bookKey, { ch }]) => {
      const bookId = bookKey?.charAt(0).toUpperCase() + bookKey?.slice(1).toLowerCase()
      const chList = Object.entries(ch || {})
      if (chList?.length>0) {
        chList.forEach(([chapter, { v }]) => {
          const vList = Object.entries(v || {})
          if (vList?.length>0) {
            vList.forEach(([verse]) => {
              retObj.vIds.add(`${bookId}.${chapter}.${verse}`)
              retObj.chIdsInUse.add(`${bookId}.${chapter}`)
              retObj.bookIdsInUse.add(`${bookId}`)
            })
          } else {
            retObj.chIds.add(`${bookId}.${chapter}`)
            retObj.bookIdsInUse.add(`${bookId}`)
        }
        })  
      } else {
        retObj.bookIds.add(`${bookId}`)
      }
    })
  }
  return retObj    
}

/*
  Simple verification to check if any verse is included in the verify bcv structure
  (See function getBcvVerifyStruct for converting a hierarchical bcv tree structure 
    to a verify structure, such as is used here)
  checkLevel is used to determine how deep to verify (default = 3, i.e. verse level).
  Check level 3 = verse, 2 = chapter and 1 = Bible book
*/
export const isVerifiedWithBcvStruct = (bcvIdStr, bcvVerifyStruct, checkLevel = 3) => {
  const bcvIdParts = bcvIdStr?.split(".")
  let isVerified = false
  if (bcvIdParts?.length > 0) {
    isVerified = bcvVerifyStruct?.bookIds.has(bcvIdParts[0])
    if ((!isVerified) && (checkLevel > 1) && (bcvIdParts.length > 1)){
      isVerified = bcvVerifyStruct?.chIds.has(`${bcvIdParts[0]}.${bcvIdParts[1]}`)
      if ((!isVerified) && (checkLevel===2)) {
        isVerified = bcvVerifyStruct?.chIdsInUse.has(`${bcvIdParts[0]}.${bcvIdParts[1]}`)
      }
      if ((!isVerified) && (bcvIdParts.length > 2)){
        isVerified = bcvVerifyStruct?.vIds.has(`${bcvIdParts[0]}.${bcvIdParts[1]}.${bcvIdParts[2]}`)
        if ((!isVerified) && (checkLevel===1)) {
          isVerified = bcvVerifyStruct?.bookIdsInUse.has(`${bcvIdParts[0]}`)
        }
      }  
    }
  }
  return isVerified
}

