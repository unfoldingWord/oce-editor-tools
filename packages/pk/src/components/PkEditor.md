# PkEditor demo

The demo demonstrates using two Editor instances (side by side) including synchronised navigation. The PkEditor uses Proskomma / Epitetele through a PkCacheProvider, which is here included as a wrapper around the workspace.

**Note:** Controlled editors (like in this example) use reference state and onSetReference passed in as an argument.

```js
import { useState, useEffect } from 'react'
import usePkBookImport from "../hooks/usePkBookImport"
import { usfmText } from '../data/tit.en.ult.usfm.js'
import { usfmText as usfmTextFra } from "../data/86-TITfraLSG.usfm.js"
import { usfmText as usfmTextPe } from "../data/1pe.en.ult.usfm.js"
import PkCacheProvider from '../context/LocalPkCacheContext'

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import BibleReference, { useBibleReference } from 'bible-reference-rcl'

function MyEditor({
  bookId,
  reference,
  onReferenceSelected,
  repoIdStr,
  langIdStr,
  usfmText,
  ...props
}) {

  const verbose = true
  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, usfmText ) 

  const editorProps = {
    bookId,
    reference,
    onReferenceSelected,
    repoIdStr,
    langIdStr,
    verbose,
    ...props,
  }

  return <>{done ? <PkEditor {...editorProps} /> : "Loading..."}</>
}

function GridCard({ title, children }) {
  return (
    <Grid item key="Test" xs={12} sm={6}>
      <Card sx={{ display: "flex", flexDirection: "column", resize: "vertical", height: "60vh" }}>
        <CardHeader subheader={title}/>
        <CardContent
          sx={{
            flexGrow: 1,
            maxHeight: "100%",
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Grid>
  )
}
const bookId = "TIT"
const bookIdPe = "1PE"
const langIdStr = 'en'
const langIdStrFra = 'fra'

function MyWorkspace() {
  const supportedBooks = null // if empty array or null then all books available
  const [reference, setReference] = useState({ bookId, chapter: 1, verse: 1 })

  const onRefChange = (bookId, chapter, verse) => {
    const bRefId = "BibleRef"
    console.log(`\n### Reference changed to ${bookId} - ${chapter}:${verse}\n\n`);
    if ((reference.sourceId !== bRefId) 
      || (reference.bookId !== bookId.toUpperCase()) 
      || (reference.chapter !== chapter) 
      || (reference.verse !== verse)) { // Do not re-trigger new events
      setReference({ sourceId: bRefId, bookId: bookId.toUpperCase(), chapter, verse })
    }
  }

  const { state, actions } = useBibleReference({
    initialBook: "tit",
    initialChapter: "1",
    initialVerse: "1",
    onChange: onRefChange,
    onPreChange: (bookId, chapter, verse, p4) => {
      console.log(`\n### onPreChange ${bookId} - ${chapter}:${verse} ${p4}\n\n`)
      return true
    },
  })

  useEffect(() => {
    actions.applyBooksFilter(supportedBooks);
  }, []); // just apply the first time in this demo

  const onReferenceSelected = ({ sourceId, bookId, chapter, verse }) => {
    console.log(`onReferenceSelected: ${sourceId} -${bookId} - ${chapter}:${verse}\n\n`);
    setReference({ sourceId, bookId, chapter, verse })
    actions.goToBookChapterVerse(bookId.toLowerCase(), chapter.toString(), verse.toString())
  }

  return (
    <Container sx={{ py: 4 }}>
      <BibleReference
        status={state}
        actions={actions}
        style={{ color: '#ffffff' }}
      />

      <h2>Workspace</h2>
      <Grid container spacing={2}>
        <GridCard key={"1"} title={`Org1: Titus (Controlled)`}>
          <MyEditor
            repoIdStr={"Xxx/en_test"}
            langIdStr={langIdStr}
            bookId={bookId}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmText}
          />
        </GridCard>
        <GridCard key={"2"} title={`Org2: Titus (Controlled)`}>
          <MyEditor
            repoIdStr={"LSG/fra_tit"}
            langIdStr={langIdStrFra}
            bookId={bookId}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmTextFra}
          />
        </GridCard>
        <GridCard key={"3"} title={`Org1: 1 Peter (Uncontrolled)`}>
          <MyEditor
            repoIdStr={"Xxx/en_test"}
            langIdStr={langIdStr}
            bookId={bookIdPe}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmTextPe}
          />
        </GridCard>
      </Grid>
    </Container>
  )
}

<PkCacheProvider>
  <MyWorkspace/>
</PkCacheProvider>

```

## Merge demo

The demo demonstrates using the onRenderToolbar to add more buttons in the toolbar.

```js
import { useState, useEffect } from 'react'
import usePkBookImport from "../hooks/usePkBookImport"
import { usfmText } from '../data/tit.en.ult.usfm.js'
import PkCacheProvider from '../context/LocalPkCacheContext'

import { Button } from '@mui/material'
import { MdUpdate } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'

function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, usfmText ) 

  const onSave = (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfmText)
  }

  const needToMergeFromMaster = true
  const mergeFromMasterHasConflicts = false
  const mergeToMasterHasConflicts = true

  // eslint-disable-next-line no-nested-ternary
  const mergeFromMasterTitle = mergeFromMasterHasConflicts
    ? 'Merge Conflicts for update from master'
    : needToMergeFromMaster
      ? 'Update from master'
      : 'No merge conflicts for update with master'
  // eslint-disable-next-line no-nested-ternary
  const mergeFromMasterColor = mergeFromMasterHasConflicts
    ? 'red'
    : needToMergeFromMaster
      ? 'orange'
      : 'lightgray'
  const mergeToMasterTitle = mergeToMasterHasConflicts
    ? 'Merge Conflicts for share with master'
    : 'No merge conflicts for share with master'
  const mergeToMasterColor = mergeToMasterHasConflicts ? 'red' : 'black'

  const onRenderToolbar = ({ items }) => [
    ...items,
    <Button
      key="update-from-master"
      value="update-from-master"
      onClick={() => {}}
      title={mergeFromMasterTitle}
      aria-label={mergeFromMasterTitle}
      style={{ cursor: 'pointer' }}
    >
      <MdUpdate id="update-from-master-icon" color={mergeFromMasterColor} />
    </Button>,
    <Button
      key="share-to-master"
      value="share-to-master"
      onClick={() => {}}
      title={mergeToMasterTitle}
      aria-label={mergeToMasterTitle}
      style={{ cursor: 'pointer' }}
    >
      <FiShare id="share-to-master-icon" color={mergeToMasterColor} />
    </Button>,
  ]

  const editorProps = {
    onSave,
    repoIdStr,
    langIdStr,
    bookId,
    onRenderToolbar,
    verbose: true,
  }
  
  return (
      <div key="1">
        { done ? <PkEditor {...editorProps} /> : 'Loading...'}
      </div>
  )
}  

```
