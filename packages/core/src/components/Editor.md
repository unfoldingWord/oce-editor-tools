# Editor demo 1

The Editor expects input of an EpiteleteHtml object.

```js
import { useState, useEffect } from 'react';

import EpiteleteHtml from "epitelete-html";

import { usfmText } from '../data/Acts.1.usfm.js';
import { usfm2perf } from '../helpers/usfm2perf';

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
    if (epiteleteHtml) loadUsfm();
  }, [epiteleteHtml])
 
  const editorProps = {
    epiteleteHtml,
    bookId: 'act',
    onSave,
    onReferenceSelected,
    activeReference: {
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
  );
};  

<Component key="1" />;

```

## Editor demo 2

The demo demonstrates using Epitelete in standalone mode (no Proskomma).
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
import { useState, useEffect } from 'react';

import __htmlPerf from '../data/tit.en.ult.perf.json';
import EpiteleteHtml from "epitelete-html";

function Component () {
  const proskomma = null;
  const docSetId = 'unfoldingWord_ult'
  const [ready, setReady] = useState(false);
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
          console.log("Start side load of Titus");
          const data = await ep.sideloadPerf('TIT', __htmlPerf)
          console.log("End side load of Titus", data);
          console.log("Books loaded:", ep.localBookCodes())
          setReady(true)
      }
      if ( ep && !ready ) loadPerf();
    }, [ep, ready]
  )
  
  const editorProps = {
    epiteleteHtml: ep,
    bookId: 'TIT',
    onSave,
    verbose
  }
  
  return (
    <>
    <div key="1">
      { ready ? <Editor key="1" {...editorProps} /> : 'Loading...'}
    </div>
    </>
  );
};  

<Component key="1" />;

```
