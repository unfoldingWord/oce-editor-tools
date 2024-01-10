# Package: VerseNavigator

## VerseNavigator controlled demo

```js

import Container from "@mui/material/Container";

function MyWorkspace() {
  return (
    <Container sx={{ py: 4 }}>
      <VerseNavigator defaultBibleRef={{
        bookId: 'Psa',
        chapter: 119,
        verse: 1
      }}/>
    </Container>
  )
}

<MyWorkspace/>

```

## VerseNavigator uncontrolled demo

```js

import Container from "@mui/material/Container";
import React from 'react';

const [chapter,setChapter] = React.useState(1)
const [verse,setVerse] = React.useState(1)
const [bookId,setBookId] = React.useState("Mat")

function handleChChange (newCh) {
  console.log(`new chapter: ${newCh}`)
  setChapter(newCh)
}
function handleVChange (newV) {
  console.log(`new verse: ${newV}`)
  setVerse(newV)
}
function handleBookChange(newBook) {
  console.log(`new book: ${newBook}`)
  setBookId(newBook.toLowerCase())
}
function MyWorkspace() {
  return (
    <Container sx={{ py: 4 }}>
      <VerseNavigator 
        onChangeChapter={handleChChange}
        onChangeVerse={handleVChange}
        onChangeBook={handleBookChange}
        bookId={bookId}
        chapter={chapter}
        verse={verse} 
      />
    </Container>
  )
}

<MyWorkspace/>

```
