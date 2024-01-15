# BibleReference

## component for navigating bible references

### Demo the component navigating verses, updating state, and using API

```js
import React, {useState, useEffect} from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BibleReference from './BibleReference';
import {
  engBibleBookName,
  normalisedBookId,
  bRefLastChapterInBook,
  bRefLastVerseInChapter,
  bRefAdvanceVPos
} from '@oce-editor-tools/verse-mapper'

const initialBook = "mal";
const initialChapter = 2;
const initialVerse = 3;
// const addOBS = true; // when is true - in bibleList we add OBS

function Component () {
  const [chapter,setChapter] = React.useState(initialChapter)
  const [verse,setVerse] = React.useState(initialVerse)
  const [bookId,setBookId] = React.useState(initialBook)

  function onChangeChapter (newCh) {
    console.log(`new chapter: ${newCh}`)
    setChapter(newCh)
  }
  function onChangeVerse (newV) {
    console.log(`new verse: ${newV}`)
    setVerse(newV)
  }
  function onChangeBook(newBook) {
    console.log(`new book: ${newBook}`)
    setBookId(newBook.toLowerCase())
  }

  const curBibleRef = {
    bookId,
    chapter,
    verse
  }

  function updateBRef(newRef) {
    if (newRef) {
      if (newRef.bookId !== bookId) {
        onChangeBook(newRef.bookId)
      } 
      if (newRef.chapter !== chapter) {
        onChangeChapter(newRef.chapter)
      } 
      if (newRef.verse !== verse) {
        onChangeVerse(newRef.verse)
      } 
    }
  }

  function goToPrevChapter () {
    console.log("gtpvC")
  }
  function goToNextChapter () {
    console.log("gtnvC")
    // bRefLastChapterInBook,
    // bRefLastVerseInChapter
  }
  function goToPrevVerse () {
    updateBRef(bRefAdvanceVPos(curBibleRef,-1))
  }
  function goToNextVerse () {
    updateBRef(bRefAdvanceVPos(curBibleRef,1))
  }

  const bRefProps = {
    bookId,
    chapter,
    verse,
    onChangeBook,
    onChangeChapter,
    onChangeVerse,
    goToPrevChapter,
    goToNextChapter,
    goToPrevVerse,
    goToNextVerse,
  }

  const curEngBookname = engBibleBookName[normalisedBookId(bookId)]

  return (
    <div>
      <div sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <BibleReference {...bRefProps} />
      </div>

      <br/>
      <br/>

      <Card variant="outlined">
        <CardContent>
          <Typography
            sx={{fontWeight: "bold"}}
            color="textPrimary"
            display="inline"
          >
            {`bible-reference-rcl`}
          </Typography>
          <Typography color="textPrimary" display="inline">
            {`\u00A0component is shown above ^^^`}
          </Typography>
          <br/>
          <br/>
          <Typography
            sx={{fontWeight: "bold"}}
            color="textPrimary"
            display="inline"
          >
            {`bible-reference-rcl`}
          </Typography>
          <Typography color="textPrimary" gutterBottom display="inline">
            {`\u00A0state examples below (dynamically updated as reference changes):`}
          </Typography>
          <br/>
          <br/>
          <Typography
            sx={{marginLeft: "50px"}}
            color="textPrimary"
            gutterBottom
            display="inline"
          >
            {`Book Name:\u00A0`}
          </Typography>
          <Typography
            sx={{fontWeight: "bold"}}
            color="textPrimary"
            gutterBottom
            display="inline"
          >
            {`${curEngBookname}`}
          </Typography>
          <br/>
          <Typography
            sx={{marginLeft: "50px"}}
            color="textPrimary"
            gutterBottom
            display="inline"
          >
            {`Current Location:\u00A0`}
          </Typography>
          <Typography
            sx={{fontWeight: "bold"}}
            color="textPrimary"
            gutterBottom
            display="inline"
          >
            {`${bookId} ${chapter}:${verse}`}
          </Typography>
        </CardContent>

        <CardActions>
          <Typography color="textPrimary">
            {`action examples that are using API to change the current reference:`}
          </Typography>

          <Button
            variant="outlined"
            id="prev_v"
            onClick={goToPrevVerse}
          >
            {"Previous Verse"}
          </Button>

          <Button
            variant="outlined"
            id="next_v"
            onClick={goToNextVerse}
          >
            {"Next Verse"}
          </Button>

          {/* <Button variant="outlined" id="prev_b" onClick={goToPrevBook}>
            {"Previous Book"}
          </Button>

          <Button variant="outlined" id="next_b" onClick={goToNextBook}>
            {"Next Book"}
          </Button> */}
        </CardActions>
      </Card>

    </div>
  )
}

<Component/>

```
