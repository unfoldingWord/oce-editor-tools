# UsfmPreview demo

The demo demonstrates using the PkPreview in standalone mode
(with all Proskomma handling done through a PkCacheProvider,
which is included as a wrapper in the app).

```js
import { usfmText } from '../data/tit.en.ult.usfm.js';

function Component () {
  const bookId = 'TIT'

  const renderFlags = {
    showTitles: true,
    showChapterLabels: true,
    showVersesLabels: true,
  };

  const previewProps = {
    usfmText,
    bookId,
    renderFlags,
    verbose: true,
  }
  
  return (
      <div key="1">
        <UsfmPreview {...previewProps} />
      </div>
  );
};  

<div>
  <Component key="1" />
</div>

```

## UsfmPreview extended demo

The demo demonstrates using the UsfmPreview together with some extended information (for instance, showing merge conflicts information).

```js
import { usfmText } from '../data/tit.en.ult.usfm.js';

import { Button } from '@mui/material'
import { MdError } from 'react-icons/md'

function Component () {
  const bookId = 'TIT'

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
    usfmText,
    bookId,
    renderFlags,
    extInfo,
    verbose: true,
  }
  
  return (
      <div key="1">
        <UsfmPreview {...previewProps} />
      </div>
  );
};  

<Component key="1" />

```
