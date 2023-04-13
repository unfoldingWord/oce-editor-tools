# PkUsfmEditor demo

The demo demonstrates the PkUsfmEditor (with all Proskomma / Epitetele handling done through a PkCacheProvider,
 which is included as a wrapper in the app).

```js
import { useState, useEffect } from 'react';
import { usfmText } from '../data/tit.en.ult.usfm.js';
import PkCacheProvider from '../context/LocalPkCacheContext'

function Component () {
  // const repoIdStr = 'unfoldingWord_ult'
  const repoIdStr = 'org-unk/msl_ifr'
  // const langIdStr = 'en'
  const langIdStr = undefined
  const bookId = 'TIT'

  const onSave = (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfmText)
  }

  const editorProps = {
    onSave,
    repoIdStr,
    langIdStr,
    usfmText,
    bookId,
  }
  
  return (
      <div key="1">
        <PkUsfmEditor {...editorProps} />
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
