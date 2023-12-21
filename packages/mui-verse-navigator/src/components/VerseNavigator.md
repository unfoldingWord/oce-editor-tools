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
      <h2>Workspace</h2>
      <VerseNavigator defaultBibleRef={{
        bookId: 'Mat',
        chapter: 1,
        verse: 1
      }}/>
    </Container>
  )
}

<MyWorkspace/>

```
