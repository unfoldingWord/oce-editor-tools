# Editor demo 1

The Editor expects input of a EpiteleteHtml object.

```js
import { useState, useEffect } from 'react';

import EpiteleteHtml from "epitelete-html";
import { useProskomma, useImport } from "proskomma-react-hooks";
import { 
  useDeepCompareCallback, 
  useDeepCompareEffect, 
  useDeepCompareMemo 
} from "use-deep-compare";

const urlDocument = ({ selectors, bookCode, bookName, filename, ...props}) => ({
  selectors,
  bookCode, 
  url: `/86-TITfraLSG.usfm`,
});

const documents = [
  urlDocument({ bookCode: 'tit', filename: 'fr_lsg_tit_book.usfm', selectors: { org: 'KentR1235', lang: 'fr', abbr: 'lsg_tit_book' } }),
];

function Component () {
  const verbose = true
  const [startImport, setStartImport] = useState(false);
  const _documents = startImport ? documents : [];

  const proskommaHook = useProskomma({ verbose });
  const { proskomma } = proskommaHook

  const onImport = (props) => console.log('Imported doc!', props);

  const { importing, done } = useImport({
    ...proskommaHook,
    onImport,
    documents,
    verbose,
  });
  
  const ready = !importing && done
  
  const onSave = (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfmText)
  }
  
  const onReferenceSelected = (reference) => {
    console.log(reference)
  }

  const docSetId = 'KentR1235/fr_lsg_tit_book'
  
  const epiteleteHtml = useDeepCompareMemo(() => (
    ready && new EpiteleteHtml({ proskomma, docSetId, options: { historySize: 100 } })
  ), [proskomma, ready, docSetId]);
  
  const editorProps = {
    epiteleteHtml,
    bookId: 'tit',
    onSave,
    onReferenceSelected,
    activeReference: {
      bookId: 'tit',
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


# Editor demo 2

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
  const docSetId = 'unfoldingWord/en_ult'
  const [ready, setReady] = useState(false);
  const [ep, setEp] = useState(new EpiteleteHtml({ proskomma, docSetId, options: { historySize: 100 } }))
  const verbose = true

  const onUnsavedData = (value) => {
    console.log(`onUnsavedData callback - value: ${value}`)
  }

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
    onUnsavedData,
    hasInitialUnsavedData: true,
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
