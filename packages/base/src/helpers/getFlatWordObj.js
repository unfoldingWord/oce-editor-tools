export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    let iCopy = Object.assign({}, item);
    delete iCopy[keyField];
    obj[item[keyField]] = iCopy;
    return obj;
  }, {});

export const getFlatWordObj = (obj) => {
  const resArray = [];
  if (obj) {
    Object.entries(obj).forEach(([chNum, chObj]) => {
      Object.entries(chObj).forEach(([vNum, verseArr]) => {
        verseArr.forEach((wObj) => {
          const occurrenceStr =
            wObj?.totalOccurrences > 1
              ? `-${wObj?.occurrence}/${wObj?.totalOccurrences}`
              : '';
          resArray.push({
            id: `${chNum}:${vNum}-${wObj?.word}${occurrenceStr}`,
            wObj,
          });
        });
      });
    });
  }
  return arrayToObject(resArray, 'id');
};