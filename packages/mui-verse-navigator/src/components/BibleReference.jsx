import React from 'react'
import PropTypes from 'prop-types'
import VerseNavigator from "./VerseNavigator"

import NavButtons, {
  NAV_TYPES_DOUBLE_NEXT,
  NAV_TYPES_DOUBLE_PREV,
  NAV_TYPES_NEXT,
  NAV_TYPES_PREV
} from "./NavButtons/NavButtons"

export function BibleReference(props) {
  const {
    bookId,
    chapter,
    verse,
    goToPrevChapter,
    goToNextChapter,
    goToPrevVerse,
    goToNextVerse,
    onChangeBook,
    onChangeChapter,
    onChangeVerse,
  } = props
  const inputValue = `${chapter}:${verse}`
  console.log(inputValue)

  const verseNavigatorProps = {
    bookId,
    chapter,
    verse,
    inputValue,
    onChangeBook,
    onChangeChapter,
    onChangeVerse,
  }
  return (
      <div>

        <NavButtons id="prev_ch" title='Previous chapter' onClick={goToPrevChapter} type={NAV_TYPES_DOUBLE_PREV} />
        <NavButtons id="prev_v" title='Previous verse' onClick={goToPrevVerse} type={NAV_TYPES_PREV} />

        <VerseNavigator {...verseNavigatorProps}/>

        <NavButtons id="next_v" title='Next verse' onClick={goToNextVerse} type={NAV_TYPES_NEXT} />
        <NavButtons id="next_ch" title='Next chapter' onClick={goToNextChapter} type={NAV_TYPES_DOUBLE_NEXT} />

      </div>
  )
}

BibleReference.propTypes = {
  /** current bookId (e.g. 'mrk') */
  bookId: PropTypes.string.isRequired,
  /** current chapter */
  chapter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** current verse */
  verse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** (function()) - method to trigger state change to previous chapter */
  goToPrevChapter: PropTypes.func.isRequired,
  /** (function()) - method to trigger state change to next chapter */
  goToNextChapter: PropTypes.func.isRequired,
  /** (function()) - method to trigger state change to previous verse */
  goToPrevVerse: PropTypes.func.isRequired,
  /** (function()) - method to trigger state change to next verse */
  goToNextVerse: PropTypes.func.isRequired,
  /** triggered when there is a change to specific book */
  onChangeBook: PropTypes.func.isRequired,
  /** triggered when there is a change to specific chapter */
  onChangeChapter: PropTypes.func.isRequired,
  /** triggered when there is a change to specific verse */
  onChangeVerse: PropTypes.func.isRequired,
}

export default BibleReference
