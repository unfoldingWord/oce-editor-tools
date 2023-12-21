import React from 'react';
import PropTypes from 'prop-types';
import ReferenceSelector from '../ReferenceSelector'
import NavButtons, {
  NAV_TYPES_DOUBLE_NEXT,
  NAV_TYPES_DOUBLE_PREV,
  NAV_TYPES_NEXT,
  NAV_TYPES_PREV
} from "../NavButtons/NavButtons";
import {removeKeys} from "../../common/ReferenceUtils";

const bibleRefDefaultStyle = {
  fontFamily: 'Noto Sans',
  fontSize: '12px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'top',
  marginLeft: '10px',
  marginRight: '10px',
  paddingTop: '2px',
  paddingBottom: '2px',
};

const chapterVerseSeparatorStyle = {
  paddingTop: "10px",
  paddingRight: "2px",
  fontWeight: "900",
  fontSize: "14px"
};

export function BibleReference(props) {
  const {
    status: {
      bookId,
      chapter,
      verse,
      bookList,
      chapterList,
      verseList,
    },
    actions: {
      goToPrevChapter,
      goToNextChapter,
      goToPrevVerse,
      goToNextVerse,
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
      bibleVerseMatcher,
    },
    style,
    inputProps,
  } = props;

  const style_ = {...bibleRefDefaultStyle, ...style}; // style property will override default style
  const childrenStyle = removeKeys(style, ['background']); // remove the background for children styles - it will be inherited by children by default, and making it explicit creates havoc

  // Render the UI for your table
  return (
      <div style={style_}>

        <NavButtons id="prev_ch" title='Previous chapter' onClick={goToPrevChapter} type={NAV_TYPES_DOUBLE_PREV} style={childrenStyle} />

        <NavButtons id="prev_v" title='Previous verse' onClick={goToPrevVerse} type={NAV_TYPES_PREV} style={childrenStyle} />

        <ReferenceSelector
          id="bible"
          matchName={true}
          options={bookList}
          initial={bookId}
          onChange={onChangeBook}
          style={childrenStyle}
          inputProps={inputProps}
          matcher={text => bibleVerseMatcher(text, 'bookId')}

          // with width 'max-content' there is still a little cropping of (1th) & (2th) on Firefox and Safari, but it is
          // not a show stopper since book names are readable.  Chrome behaves differently by increasing the width to
          // accommodate the vertical scrollbar, but others do not which causes clipping of right side of longest strings.
          // Also tried setting popper width to 'fit-content', but still see same results as fit-content.
          usePopperWidth={'max-content'}
        />

        <ReferenceSelector
          id="chapter"
          options={chapterList}
          initial={chapter}
          onChange={onChangeChapter}
          style={childrenStyle}
          inputProps={inputProps}
          matcher={text => bibleVerseMatcher(text, 'c')}
        />

        <div style={chapterVerseSeparatorStyle}>:</div>

        <ReferenceSelector
          id="verse"
          options={verseList}
          initial={verse}
          onChange={onChangeVerse}
          style={childrenStyle}
          inputProps={inputProps}
          matcher={text => bibleVerseMatcher(text, 'v')}
        />

        <NavButtons id="next_v" title='Next verse' onClick={goToNextVerse} type={NAV_TYPES_NEXT} style={childrenStyle} />

        <NavButtons id="next_ch" title='Next chapter' onClick={goToNextChapter} type={NAV_TYPES_DOUBLE_NEXT} style={childrenStyle} />

      </div>
  )
}

BibleReference.defaultProps = {
  style: {}
};

BibleReference.propTypes = {
  status: PropTypes.shape({
    /** current bookId (e.g. 'mrk') */
    bookId: PropTypes.string.isRequired,
    /** current chapter */
    chapter: PropTypes.string.isRequired,
    /** current verse */
    verse: PropTypes.string.isRequired,
    /** array of current book selection options */
    bookList: PropTypes.array.isRequired,
    /** array of current chapter selection options */
    chapterList: PropTypes.array.isRequired,
    /** array of current verse selection options */
    verseList: PropTypes.array.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    /** (function()) - method to trigger state change to previous chapter */
    goToPrevChapter: PropTypes.func.isRequired,
    /** (function()) - method to trigger state change to next chapter */
    goToNextChapter: PropTypes.func.isRequired,
    /** (function()) - method to trigger state change to previous verse */
    goToPrevVerse: PropTypes.func.isRequired,
    /** (function()) - method to trigger state change to next verse */
    goToNextVerse: PropTypes.func.isRequired,
    /** (function(bookID: string)) - method to change to specific book */
    onChangeBook: PropTypes.func.isRequired,
    /** (function(bookID: string)) - method to change to specific chapter */
    onChangeChapter: PropTypes.func.isRequired,
    /** (function(bookID: string)) - method to change to specific verse */
    onChangeVerse: PropTypes.func.isRequired,
  }).isRequired,
  /** custom styles to use, defaults to {} */
  style: PropTypes.object,
  /** TextField props */
  inputProps: PropTypes.object,
};

export default BibleReference;
