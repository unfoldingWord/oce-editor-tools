# PkPrintModal demo

The demo demonstrates using the PkPrintModal in standalone mode
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

  const previewProps = {
    openPrintModal: isOpen && done,
    handleClosePrintModal: () => {
      console.log('closePrintModal')
      setIsOpen(false)
    },
    repoIdStr,
    langIdStr,
    bookId,
    renderFlags,
    verbose: true,
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
        { done ? <PkPrintModal {...previewProps} /> : 'Loading...'}
      </div>
  )
} 

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
