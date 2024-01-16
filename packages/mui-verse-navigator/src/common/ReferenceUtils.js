import _ from 'lodash';
import {BIBLE_BOOKS, BOOK_CHAPTER_VERSES} from "./BooksOfTheBible";

// consts
export const USE_FIRST = Number.NEGATIVE_INFINITY;
export const USE_LAST = Number.POSITIVE_INFINITY;

/**
 * get formatted description for book of the bible
 * @param {string} bookID
 * @param {string} bookName
 * @return {string}
 */
export function getFullBookDescription(bookID, bookName) {
  return `${bookName} (${bookID})`;
}

export function findItemIndexDefault(options, initialSelection, defaultIndex = 0) {
  let found = findKeyInList(options, 'key', initialSelection);
  if (found <= 0) {
    found = defaultIndex;
  }
  return found;
}

export function findItemDefault(options, initialSelection, defaultIndex = 0) {
  let found = findItemIndexDefault(options, initialSelection, defaultIndex);
  return options[found];
}

/**
 * takes book list and trims it down to an array that matches bookIDs in filter
 * @param bookList - an array of autocomplete objects where key is the book id
 * @param filter - array of bookIDs to filter - this is a list of bookIDs to keep
 * @return {*}
 */
export function filterBibleList(bookList, filter) {
  let filteredBookList = _.cloneDeep(bookList);
  if (filter && filter.length) {
    filteredBookList = filteredBookList.filter(item => {
      const bookID = item.key;
      const found = filter ? filter.indexOf(bookID) : 1;
      return (found >= 0);
    });
  }
  return filteredBookList;
}

export function createBibleListItem(bookID, bookName, dropDownDescription) {
  const item = {
    key: bookID,
    name: bookName,
    label: dropDownDescription
  };
  return item;
}

export function getBibleList(filter = null, addOBS = false) {
  let allBibleBooks;
  if (!addOBS) {
    allBibleBooks = {
      ...BIBLE_BOOKS.oldTestament,
      ...BIBLE_BOOKS.newTestament,
    };
  } else {
    allBibleBooks = {
      ...BIBLE_BOOKS.oldTestament,
      ...BIBLE_BOOKS.newTestament,
      ...BIBLE_BOOKS.obs,
    };
  }
  const bibleBooks = Object.keys(allBibleBooks).map( bookID => {
    const bookName = allBibleBooks[bookID];
    const dropDownDescription = getFullBookDescription(bookID, bookName);
    const item = createBibleListItem(bookID, bookName, dropDownDescription);
    return item;
  });
  return filterBibleList(bibleBooks, filter);
}

export function getChapterList(bookID, bookChapters = BOOK_CHAPTER_VERSES) {
  const bookInfo = bookChapters[bookID];
  if (bookInfo) {
    const chapters = Object.keys(bookInfo);
    if (chapters && chapters.length) {
      return chapters.map(chapter => ({
        key: chapter,
        name: chapter,
        label: chapter,
      }));
    }
  }
  return [];
}

export function getVerseList(bookID, chapter, bookChapters = BOOK_CHAPTER_VERSES) {
  const bookInfo = bookChapters[bookID];
  if (bookInfo) {
    let verses = bookInfo[chapter];
    if (verses) {
      if (typeof verses === 'string') {
        verses = Number.parseInt(verses);
      }
      if (verses >= 0) {
        const verseList = Array.from({length: verses}, (x, i) => {
          const verse = `${i+1}`;
          return {
            key: verse,
            name: verse,
            label: verse,
          };
        });
        return verseList;
      }
    }
  }
  return [];
}

export const findKeyInList = (list, key, value) => {
  const valueLC = value.toString().toLowerCase();
  return list.findIndex(item => ((item[key] || '').toString().toLowerCase() === valueLC));
}

/**
 * make sure key is in list and replace USE_FIRST/USE_FIRST with actual value
 * @param {array} list
 * @param {string|number} key
 * @return {string}
 */
export const doSanityCheck = (list, key) => {
  if (!list.length) {
    console.error(`doSanityCheck() - list is empty for ${key}`);
    return '';
  }

  if (key === USE_FIRST) {
    key = getFirstItem(list);
  } else if (key === USE_LAST) {
    key = getLastItem(list);
  } else {
    const found = findKeyInList(list, 'key', key);
    if (found < 0) { // if key not found in list, use key of first entry
      if (list.length) {
        const newKey = list[0].key;
        console.warn(`Attempting to set current value to ${key} which is invalid, falling back to ${newKey}`);
        key = newKey;
      }
    }
  }
  return key;
}

export function getFirstItem(list) {
  let key = '';
  if (list.length) {
    key = list[0].key;
  } else {
    key = '';
  }
  return key;
}

export function getLastItem(list) {
  let key = '';
  if (list.length) {
    key = list[list.length - 1].key;
  } else {
    key = '';
  }
  return key;
}

export const getNextItem = (list, key) => {
  let overflow = false;
  const found = findKeyInList(list, 'key', key);
  if (found < 0) { // if key not found in list, use key of first entry
    key = getFirstItem(list, key);
  } else if (found >= list.length - 1) { // if we hit the limit
    overflow = true;
  } else {
    const newItem = list[found + 1];
    key = newItem.key;
  }
  return { key, overflow };
}

export const getPrevItem = (list, key) => {
  let overflow = false;
  const found = findKeyInList(list, 'key', key);
  if (found < 0) { // if key not found in list, use key of first entry
    key = getFirstItem(list, key);
  } else if (found <= 0) { // if we hit the limit
    overflow = true;
  } else {
    const newItem = list[found - 1];
    key = newItem.key;
  }
  return { key, overflow };
}

/**
 * make clone of object and remove keys in remove
 * @param {object} object
 * @param {array} remove
 * @return {object}
 */
export function removeKeys(object, remove) {
  let newObject = _.cloneDeep(object);
  for (const key of remove) {
    if (key) {
      if (newObject.hasOwnProperty(key)) {
        delete newObject[key];
      }
    }
  }
  return newObject;
}

/**
 * split text such as `5:2` into chapter and verse
 * @param ch_vs
 * @return {{c: string, v: string}}
 */
function findChapterVerse(ch_vs) {
  console.log(`findChapterVerse - checking ch:vs - (${ch_vs})`);
  let c, v;
  const found = ch_vs.match(/^(\d+)(:(\d+))?$/);
  if (found) {
    console.log(`findChapterVerse - found - (${JSON.stringify(found)})`);
  }
  if (found?.length > 1) {
    c = found[1];
    v = ((found.length > 3) && found[3]) || '1';
    console.log(`findChapterVerse - found (${c}:${v})`);
  }
  return {c, v};
}

/**
 * extract bible references from text such as `mat 1:2` or `Mark 3:4`
 * @param text - to search for bible references
 * @return {{bookId: string, c: string, v: string}} returns bible reference
 */
export function getBookChapterVerse(text) {
  console.log(`getBookChapterVerse(${text})`);
  if (text) {
    const text_ = text.trim();
    const parts = text_.split(' ').filter((item) => item.length);
    if (parts.length === 2) {
      const ch_vs = parts[1];
      const { c, v } = findChapterVerse(ch_vs);
      if (c && v) {
        const bookId = parts[0];
        const found = bookId.match(/^[\d]?([^\d\W]+)$/i); // make sure book name is just word with no numbers or punctuation (may optionally have a leading digit)
        console.log(`getBookChapterVerse(${text}) book=${bookId}, found=${JSON.stringify(found)}`);
        if (found) {
          return {bookId, c, v};
        }
      }
    }
  }
  return null;
}

/**
 * search through book IDs and names to find the bookId that matches (case insensitive matching)
 * @param bookOptions - list of supported books
 * @param book - book Id or name to match
 * @return {null|string}
 */
export function findBookId(bookOptions, book) {
  if (book) {
    const book_ = book.trim().toLowerCase();
    for (const item of bookOptions) {
      if ((book_ === item.key.toLowerCase()) || (book_ === item.name.toLowerCase())) {
        return item.key;
      }
    }
  }
  return null;
}

export function delay(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms),
  )
}
