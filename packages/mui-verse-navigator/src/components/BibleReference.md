# Package: VerseNavigator

## BibleReference demo

```js

import Container from "@mui/material/Container";

function MyWorkspace() {
  return (
    <Container sx={{ py: 4 }}>
      <BibleReference defaultBibleRef={{
        bookId: 'Psa',
        chapter: 119,
        verse: 1
      }}/>
    </Container>
  )
}

<MyWorkspace/>

```
