# PkUsfmEditor demo

The demo demonstrates the PkUsfmEditor (with all Proskomma / Epitetele handling done through a PkCacheProvider, 
 which is included as a wrapper in the app).

```js
import { useState, useEffect } from 'react';
import { usfmText } from '../data/tit.en.ult.usfm.js';
import PkCacheProvider from '../context/LocalPkCacheContext'
import PreviewIcon from '@mui/icons-material/Preview'
import Button from '@mui/material/Button'


function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'
  const [isOpen,setIsOpen] = useState(true)

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

  const handleClick = () => setIsOpen(!isOpen)

  return (
      <div key="1">
        <Button 
          variant='outlined' 
          startIcon={<PreviewIcon/>}
          onClick={handleClick}
        >
          Toggle view
        </Button>
        {isOpen ? <PkUsfmEditor {...editorProps} /> : <div/>}
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
