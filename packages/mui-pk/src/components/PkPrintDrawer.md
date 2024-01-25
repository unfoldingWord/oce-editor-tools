# PkPrintDrawer demo

The demo demonstrates using the PkPrintDrawer in standalone mode
(with all Proskomma handling done through a PkCacheProvider,
which is included as a wrapper in the app).

```js
import { useState, useEffect } from 'react'
import usePkBookImport from "../hooks/usePkBookImport"
import { usfmText } from '../data/tit.en.ult.usfm.js'
import PkCacheProvider from '../context/LocalPkCacheContext'
import Button from '@mui/material/Button'
import PrintIcon from '@mui/icons-material/Print'

function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'
  const [isOpen,setIsOpen] = useState(false)

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, bookId, usfmText ) 

  const renderFlags = {
    showTitles: true,
    showChapterLabels: true,
    showVersesLabels: true,
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const displayFont = 'sans-serif';
  const displayFontSize = '100%';
  const displayLineHeight = '1.13';

  const previewProps = {
    openPrintDrawer: isOpen && done,
    onClosePrintDrawer: () => {
      console.log('closePrintDrawer')
      setIsOpen(false)
    },
    repoIdStr,
    langIdStr,
    bookId,
    renderFlags,
    verbose: true,
    printFont: displayFont,
    printFontSize: displayFontSize,
    printLineHeight: displayLineHeight,
  }
  
  return (
      <div key="1">
        <Button 
          variant='outlined' 
          startIcon={<PrintIcon/>}
          onClick={handleClick}
        >
          Print preview
        </Button>
        { done ? <PkPrintDrawer {...previewProps} /> : 'Loading...'}
      </div>
  )
} 

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
