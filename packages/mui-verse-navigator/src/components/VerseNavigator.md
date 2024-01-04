# Package: VerseNavigator

## Other packages in the same monorepo

core - <https://oce-editor-tools-pk.netlify.app>

simple - <https://simple-oce-editor-tools.netlify.app>

## VerseNavigator demo

```js

import Container from "@mui/joy/Container";

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
