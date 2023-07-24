# Editor demo 1

The demo demonstrates using four Editor instances (side by side) including synchronised navigation.

**Note:** Uncontrolled editors use a local editor reference state, while controlled editors use reference state and onSetReference passed in as an argument, use the lock icon to force the editor to be uncontrolled.

```js
import React, { useState, useEffect, useMemo } from "react";

import EpiteleteHtml from "epitelete-html";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { usfmText } from "../data/tit.en.ult.usfm.js";
import { usfmText as usfmTextFra } from "../data/86-TITfraLSG.usfm.js";
import { usfmText as usfmTextPe } from "../data/1pe.en.ult.usfm.js";
import { usfm2perf } from "../helpers/usfm2perf";

function MyEditor({
  bookId,
  reference,
  onReferenceSelected,
  docSetId,
  usfmText,
  ...props
}) {
  const verbose = true;
  const [ready, setReady] = useState(false);
  const epiteleteHtml = useMemo(
    () =>
      new EpiteleteHtml({
        proskomma: undefined,
        docSetId,
        options: { historySize: 100 },
      }),
    []
  );

  const onSave = (bookCode, usfmText) => {
    console.log(`save button clicked: ${docSetId} ${bookCode}`, usfmText);
  };

  useEffect(() => {
    async function loadUsfm() {
      const tempPerf = usfm2perf(usfmText);
      await epiteleteHtml.sideloadPerf(bookId, tempPerf);
      setReady(true);
    }
    if (epiteleteHtml) loadUsfm();
  }, [epiteleteHtml]);

  const editorProps = {
    epiteleteHtml,
    bookId,
    reference,
    onReferenceSelected,
    onSave,
    verbose,
    ...props,
  };

  return <>{ready ? <Editor {...editorProps} /> : "Loading..."}</>;
}

function GridCard({ title, children }) {
  return (
    <Grid item key="Test" xs={12} sm={6}>
      <Card sx={{ display: "flex", flexDirection: "column", resize: "both", }}>
        <CardHeader subheader={title}/>
        <CardContent
          sx={{
            flexGrow: 1,
            minHeight: "40vh",
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
}
const bookId1 = "TIT";
const bookId2 = "1PE";

function MyWorkspace() {
  const [reference, setReference] = useState({ bookId: bookId1, chapter: 1, verse: 1 });

  const onReferenceSelected = ({ sourceId, bookId, chapter, verse }) => {
    setReference({ sourceId, bookId: bookId, chapter, verse });
  };

  return (
    <Container sx={{ py: 4 }}>
      <h2>Workspace</h2>
      <Grid container spacing={2}>
        <GridCard title={`Org1: 1Peter (Uncontrolled)`}>
          <MyEditor
            docSetId={"ORG1-en_ult/1pe"}
            bookId={bookId2}
            usfmText={usfmTextPe}
          />
        </GridCard>
        <GridCard title={`Org2: 1Peter (Controlled)`}>
          <MyEditor
            docSetId={"ORG2-en_ult/1pe"}
            bookId={bookId2}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmTextPe}
          />
        </GridCard>
        <GridCard title={`Org3: Titus (Controlled)`}>
          <MyEditor
            docSetId={"Xxx/en_tit"}
            bookId={bookId1}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmText}
          />
        </GridCard>
        <GridCard title={`Org4: Titus (Controlled)`}>
          <MyEditor
            docSetId={"LSG/fra_tit"}
            bookId={bookId1}
            reference={reference}
            onReferenceSelected={onReferenceSelected}
            usfmText={usfmTextFra}
          />
        </GridCard>
      </Grid>
    </Container>
  );
}

<MyWorkspace/>

```


## Editor demo 2

The Editor expects input of an EpiteleteHtml object.

```js
import React, { useState, useEffect } from 'react'

import EpiteleteHtml from "epitelete-html"

import { usfmText } from '../data/Acts.1.usfm.js'
import { usfm2perf } from '../helpers/usfm2perf'

function Component () {
  const verbose = true
  const docSetId = "Xxx/en_act" // just dummy values
  const [ready,setReady] = useState(false)
  const [epiteleteHtml, setEpiteleteHtml] = useState(
    new EpiteleteHtml(
      { proskomma: undefined, docSetId, options: { historySize: 100 } }
    )
  )
  
  const onSave = (bookCode,usfmText) => {
    console.log(`save button clicked: ${bookCode}, ${usfmText}`) 
  }
  const onReferenceSelected = (reference) => {
    console.log(`onReferenceSelected: ${reference}`)
  }
  
  useEffect(() => {
    async function loadUsfm() {
      const tempPerf = usfm2perf(usfmText)
      await epiteleteHtml.sideloadPerf('ACT', tempPerf)
      setReady(true)
    }
    if (epiteleteHtml) loadUsfm()
  }, [epiteleteHtml])
 
  const editorProps = {
    epiteleteHtml,
    bookId: 'act',
    onSave,
    onReferenceSelected,
    bcvSyncRef: {
      bookId: 'act',
      chapter: 1,
      verse: 4,
    },
    verbose
  }
 
  return (
    <>
    <div key="1">
      { ready ? <Editor key="1" {...editorProps} /> : 'Loading...' }
    </div>
    </>
  )
}  

<Component key="1" />

```

## Editor demo 3

The demo demonstrates using Epitelete in standalone mode (no Proskomma) including some added toolbar buttons (extended through "onRenderToolbar")
Here is the function for sideloading:

```txt
    /**
     * Loads given perf into memory
     * @param {string} bookCode
     * @param {perfDocument} perfDocument - PERF document
     * @return {Promise<perfDocument>} same sideloaded PERF document
     */
    async sideloadPerf(bookCode, perfDocument, options = {}) {
```

```js
import React, { useState, useEffect } from 'react'

import __htmlPerf from '../data/tit.en.ult.perf.json'
import EpiteleteHtml from "epitelete-html"
  
import { Button } from '@mui/material'
import { MdUpdate } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'

function Component () {
  const proskomma = null
  const docSetId = 'unfoldingWord_ult'
  const [ready, setReady] = useState(false)
  const [ep, setEp] = useState(new EpiteleteHtml({ proskomma, docSetId, options: { historySize: 100 } }))
  const verbose = true

  const onSave = async (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log("USFM:",usfmText)
    console.log("Trying getDocument() method")
    const perfJson = await ep.getDocument(bookCode)
    console.log("PERF:",JSON.stringify(perfJson, null, 4))
  }

  useEffect(
    () => {
      async function loadPerf() {
          console.log("Start side load of Titus")
          const data = await ep.sideloadPerf('TIT', __htmlPerf)
          console.log("End side load of Titus", data)
          console.log("Books loaded:", ep.localBookCodes())
          setReady(true)
      }
      if ( ep && !ready ) loadPerf()
    }, [ep, ready]
  )

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
    epiteleteHtml: ep,
    bookId: 'TIT',
    editable: true,
    onSave,
    onRenderToolbar,
    verbose
  }
  
  return (
    <>
    <div key="1">
      { ready ? <Editor key="1" {...editorProps} /> : 'Loading...'}
    </div>
    </>
  )
}  

<Component key="1" />

```
