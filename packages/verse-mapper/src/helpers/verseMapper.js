import { 
  versification_ESV,
  short3LetterId2osis,
  normaliseBooksExceptions,
} from "../constants/bcvVerseMap"

export const cumulativeSum = ([head, ...tail]) =>
  tail.reduce(
    (acc, x, index) => {
      acc.push(acc[index] + x)
      return acc
    },
    [head]
  )

export const verseMapExtended = (orgVerseMap) => {
  const { 
    osisOrderedBibleBooks,
    chaptersInBook, 
    lastVerseInChapter, 
    // verseWithSpecialState, 
  } = orgVerseMap

  const deriveLastVCountInBooks = () => {
    const retArr = []
    let curCh = 0
    let end = 0
    chaptersInBook?.forEach(chCnt => {
      end += chCnt
      let vCnt = 0
      while (curCh < end) {
        vCnt+=lastVerseInChapter[curCh]
        curCh+=1
      }
      retArr.push(vCnt)
    })
    return retArr
  }
  
  const deriveBibleBookIndex = () => {
    const retArr = {}
    osisOrderedBibleBooks?.forEach((idStr,inx) => {
      retArr[idStr] = inx
    })
    return retArr
  }
  
  const osisBibleBookIndex = deriveBibleBookIndex()
  const lastVCountInBook = deriveLastVCountInBooks()
  const bookInitialVCount = [0, ...cumulativeSum(lastVCountInBook)]
  const bookInitialChCount = [0, ...cumulativeSum(chaptersInBook)]
  const chInitialVCount = [0, ...cumulativeSum(lastVerseInChapter)]
  
  return {
    ...orgVerseMap,
    osisBibleBookIndex,
    lastVCountInBook,
    bookInitialVCount,
    bookInitialChCount,
    chInitialVCount,
  }
}

const idToOsis = bId => short3LetterId2osis[bId.toLowerCase(bId)]

const findBinaryInRange = (arr, target) => {
  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    let middle1 = Math.floor((start + end) / 2)
    let middle2 = middle1 +1
    if (middle2 >= arr.length) {
      middle2 = middle1
    }
    if ((arr[middle1] < target) && (arr[middle2] < target)) {
      start = middle1 + 1
    } else if ((arr[middle1] <= target) && (arr[middle2] >= target)) {
      return middle1
    } else if (arr[middle1] > target) {
      end = middle1 - 1
    }
  }
  return -1
}

export function normalisedBookId (bookId) {
  const lowerStr = bookId.toLowerCase()
  let retVal = normaliseBooksExceptions[lowerStr]
  if (!retVal) {
    retVal = lowerStr.substring(0,3)
  }
  return retVal
}

const defaultVerseMap = verseMapExtended(versification_ESV)

export function vInx2bRef (vInx, verseMap) {
  const vMap = verseMap || defaultVerseMap
  const retObj = {}
  const bookInx = findBinaryInRange(vMap.bookInitialVCount,vInx)
  if (bookInx >= 0) {
    retObj.bookId = vMap.osisOrderedBibleBooks[bookInx]
    const curChInx = vMap.bookInitialChCount[bookInx]
    let checkCh = 1
    retObj.chapter = 1
    while (vInx >= vMap.chInitialVCount[curChInx+checkCh]) {
      retObj.chapter = checkCh+1
      checkCh+=1
    }
    retObj.verse = vInx +1 - vMap.chInitialVCount[curChInx +checkCh -1]
  }
  return retObj
}

export function bRef2vInx (bRefObj, verseMap) {
  const vMap = verseMap || defaultVerseMap
  let retVal = -1
  if (bRefObj?.bookId) {
    const bookInx = vMap.osisBibleBookIndex[idToOsis(normalisedBookId(bRefObj.bookId))]
    retVal = vMap.bookInitialVCount[bookInx]
    if (bRefObj?.chapter) {
      const curChInx = vMap.bookInitialChCount[bookInx] +bRefObj.chapter -1
      retVal = vMap.chInitialVCount[curChInx]
      if (bRefObj?.verse) {
        retVal+=bRefObj.verse-1
      }
    }  
  }
  return retVal
}

export function bRefAdvanceVPos (bRefObj,stepLength, verseMap) {
  let curVInx = bRef2vInx(bRefObj, verseMap)
  if (curVInx>=0) {
    curVInx+=stepLength
  }
  return vInx2bRef(curVInx, verseMap)
}

export function bRefLastChapterInBook (bRefObj, verseMap) {
  const vMap = verseMap || defaultVerseMap
  let retVal = -1
  if (bRefObj?.bookId) {
    const bookInx = vMap.osisBibleBookIndex[idToOsis(normalisedBookId(bRefObj.bookId))]
    if (bookInx>=0) {
      retVal = vMap.chaptersInBook[bookInx]
    }
  }
  return retVal
}

export function bRefLastVerseInChapter (bRefObj, verseMap) {
  const vMap = verseMap || defaultVerseMap
  let retVal = -1
  if (bRefObj?.bookId) {
    const curBookName = idToOsis(normalisedBookId(bRefObj.bookId))
    if (curBookName) {
      const bookInx = vMap.osisBibleBookIndex[curBookName]
      if ((bRefObj?.chapter) && (bookInx>=0)) {
        const curCh = vMap.bookInitialChCount[bookInx] +bRefObj.chapter -1
        retVal = vMap.lastVerseInChapter[curCh]
      }
    }
  }
  return retVal
}

