# PkAligner demo

The demo demonstrates using the PkAligner in standalone mode
(with all Proskomma handling done through a PkCacheProvider,
which is included as a wrapper in the app).

```js
import { useState, useEffect } from 'react';
import usePkBookImport from "../hooks/usePkBookImport";
import { usfmText } from '../data/tit.en.ult.usfm.js';
import PkCacheProvider from '../context/LocalPkCacheContext'

function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'
  const verseRangeStr = 'Tit.2.3'

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, usfmText ) 

  const alignerProps = {
    repoIdStr,
    langIdStr,
    verseRangeStr,
    verbose: true,
  }
  
  return (
      <div key="1">
        { done ? <PkAligner {...alignerProps} /> : 'Loading...'}
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
