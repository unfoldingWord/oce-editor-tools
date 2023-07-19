# PkPreview demo

The demo demonstrates using the PkPreview in standalone mode
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

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, usfmText ) 

  const renderFlags = {
    showTitles: true,
    showChapterLabels: true,
    showVersesLabels: true,
  };

  const previewProps = {
    repoIdStr,
    langIdStr,
    bookId,
    renderFlags,
    verbose: true,
  }
  
  return (
      <div key="1">
        { done ? <PkPreview {...previewProps} /> : 'Loading...'}
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```

## PkPreview extended demo

The demo demonstrates using the PkPreview together with some extended information (for instance, showing merge conflicts information).

```js
import { useState, useEffect } from 'react';
import usePkBookImport from "../hooks/usePkBookImport";
import { usfmText } from '../data/tit.en.ult.usfm.js';
import PkCacheProvider from '../context/LocalPkCacheContext'

import { Button } from '@mui/material'
import { MdError } from 'react-icons/md'

function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, usfmText ) 

  const onRenderItem = (props) => {
    const {verseId, extInfo} = props
    const {messageStr,color} = extInfo
    return (
      <Button
        key={"update-from-master"+verseId}
        variant="contained"
        value="update-from-master"
        color={color}
        title={messageStr}
        aria-label={verseId}
        style={{ cursor: 'pointer' }}
        startIcon={<MdError/>}
      >Conflict</Button>
    )
  }

  const extInfo = {
    book: {
      tit: {
        ch: {
          1: { 
              v: {
                7: { 
                  color: 'success',
                  onRenderItem,
                  messageStr: `Existing changes:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum consequat ex a varius. Fusce varius ac nisl.
Your edited text: 
Vivamus ante ligula, tempor vel suscipit nec, elementum vel lectus. Nulla porttitor `
                },
                8: { 
                  color: 'error',
                  onRenderItem,
                  messageStr: `Existing changes:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum consequat ex a varius. Fusce varius ac nisl.
Your edited text: 
Vivamus ante ligula, tempor vel suscipit nec, elementum vel lectus. Nulla porttitor `
                },
                10: { 
                  color: 'secondary',
                  onRenderItem,
                  messageStr: `Existing changes:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum consequat ex a varius. Fusce varius ac nisl.
Your edited text: 
Vivamus ante ligula, tempor vel suscipit nec, elementum vel lectus. Nulla porttitor `
                },
              } 
          },
          2: { 
              v: {
                1: { 
                  color: 'error',
                  onRenderItem,
                  messageStr: `Existing changes:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum consequat ex a varius. Fusce varius ac nisl.
Your edited text: 
Vivamus ante ligula, tempor vel suscipit nec, elementum vel lectus. Nulla porttitor `
                },
              } 
          },
        },
      },
    },
  }

const renderFlags = {
    showTitles: true,
    showChapterLabels: true,
    showVersesLabels: true,
  };


  const previewProps = {
    repoIdStr,
    langIdStr,
    bookId,
    renderFlags,
    extInfo,
    verbose: true,
  }
  
  return (
      <div key="1">
        { done ? <PkPreview {...previewProps} /> : 'Loading...'}
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
