# PkUsfmEditor demo

The demo demonstrates the PkUsfmEditor (with all Proskomma / Epitetele handling done through a PkCacheProvider,
 which is included as a wrapper in the app).

```js
import { useState, useEffect } from 'react'
import { usfmText } from '../data/tit.en.ult.usfm.js'
import { usfmText as usfmTextPe } from "../data/1pe.en.ult.usfm.js"
import PkCacheProvider from '../context/LocalPkCacheContext'
import useUnsavedDataState from '../hooks/useUnsavedDataState'
import PreviewIcon from '@mui/icons-material/Preview'
import Button from '@mui/joy/Button'

import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/joy/Grid";
import Container from "@mui/joy/Container";

const bookId = "TIT"
const bookIdPe = "1PE"
const langIdStr = 'en'
const repoIdStr = "Xxx/en_test"

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

  const onSave = (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfmText)
  }

  const editorProps = {
    bookId,
    reference,
    onReferenceSelected,
    onSave,
    repoIdStr,
    langIdStr,
    usfmText,
    verbose,
    ...props,
  }

  return <PkUsfmEditor {...editorProps} />
}

function GridCard({ title, children }) {
  return (
    <Grid item key="Test" xs={12} sm={6}>
      <Card sx={{ display: "flex", flexDirection: "column", resize: "vertical", height: "60vh" }}>
        <Typography subheader={title}/>
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

function MyWorkspace() {
  const [isOpen,setIsOpen] = useState(false)
  const [reference, setReference] = useState({ bookId, chapter: 1, verse: 1 })
  const { hasUnsavedData } = useUnsavedDataState() 

  const onReferenceSelected = ({ sourceId, bookId, chapter, verse }) => {
    console.log(`onReferenceSelected: ${sourceId} -${bookId} - ${chapter}:${verse}\n\n`);
    setReference({ sourceId, bookId, chapter, verse })
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (hasUnsavedData(repoIdStr, langIdStr, bookIdPe)) {
      console.log("Warning: Unsaved data!")
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button 
        variant='outlined' 
        startIcon={<PreviewIcon/>}
        onClick={handleClick}
      >
        Toggle view
      </Button>
      <Grid container spacing={2}>
        <GridCard key={"1"} title={`Titus`}>
          <MyEditor
            repoIdStr={repoIdStr}
            langIdStr={langIdStr}
            bookId={bookId}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmText}
          />
        </GridCard>
        {!isOpen ? <div/> : (<GridCard key={"2"} title={`Peter`}>
          <MyEditor
            repoIdStr={repoIdStr}
            langIdStr={langIdStr}
            bookId={bookIdPe}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmTextPe}
          />
        </GridCard>)}
      </Grid>
    </Container>
  )
}

<PkCacheProvider>
  <MyWorkspace/>
</PkCacheProvider>

```
