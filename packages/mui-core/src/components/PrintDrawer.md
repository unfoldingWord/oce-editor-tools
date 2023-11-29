# PrintDrawer demo

The demo demonstrates using the PrintDrawer for rendering an Usfm text

```js
import React, {useState} from 'react'
import * as UsfmEN from '../data/Acts.1.usfm.js'
import * as UsfmEn1Pe from '../data/1pe.en.ult.usfm.js'
import * as UsfmHbo from '../data/hbo_uhb_57-TIT.usfm.js'
import { 
  useUsfmPreviewRenderer, 
  renderStyles as renderStylesLtr, 
  renderStylesRtl 
} from "@oce-editor-tools/base"
import DOMPurify from 'dompurify'

const usfmText = UsfmEN.usfmText
  // could also use UsfmEn1Pe.usfmText for a multi-chapter example
  //   or UsfmHbo.usfmText for a right to left example
const renderStyles = renderStylesLtr // use default Left to right languages
  // for right to left languages use stylesRtl_

function Component () {
  const [isOpen,setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)

  const renderFlags = {
    showWordAtts: false,
    showTitles: true,
    showHeadings: true,
    showIntroductions: true,
    showFootnotes: false,
    showXrefs: false,
    showParaStyles: false,
    showCharacterMarkup: false,
    showChapterLabels: true,
    showVersesLabels: true,
  }

  const { renderedData, ready } = useUsfmPreviewRenderer({ 
    usfmText,
    renderFlags,
    htmlRender: true,
    renderStyles,
  })

  const previewProps = {
    openPrintDrawer: isOpen && ready,
    handleClosePrintDrawer: () => {
      console.log('closePrintDrawer')
      setIsOpen(false)
    },
    onRenderContent: () => renderedData,
    canChangeAtts: false,
    canChangeColumns: true,
  }
  
  return (
      <div key="1">
        { ready && (<button onClick={handleClick}>
          Print preview
        </button>)}
        { ready ? <PrintDrawer {...previewProps} /> : 'Loading...'}
        { ready && (<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(renderedData)}}/>)}
      </div>
  )
} 

<div>
  <Component key="1" />
</div>

```

## PrintDrawer demo 2 - with OBS content

The demo demonstrates how to use the PrintDrawer with markup content.

```js

import React, { useState, useEffect } from 'react'
import { markup } from "@oce-editor-tools/base"

const range = (start, end) => Array.from(
  Array(end - start + 1).keys()
).map(x => x + start)

const zeroPad = (num, places) => String(num).padStart(places, '0')

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const OBSfetchItem = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const retText = await response.text()
  return retText
}

const OBSfetchContent = async (baseUrl) => {
  const contentList = [
    'front/title', 
    'front/intro', 
    '$chNbr', 
    'back/intro'
  ]
  const extStr = '.md'
  let resStr = ''
  await asyncForEach(contentList, async (item) => {
    if (item === '$chNbr') {
      // await asyncForEach(range(1,50), async (nbr) => {
      // Limit to only 3 stories in this demo !
      await asyncForEach(range(1,3), async (nbr) => {
        resStr += await OBSfetchItem(baseUrl+zeroPad(nbr,2)+extStr)
      })
    } else {
        resStr += await OBSfetchItem(baseUrl+item+extStr)
    }
  })
  return resStr
}

function Component () {
  const [markupStr, setMarkupStr] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const [isOpen,setIsOpen] = useState(false)

  useEffect(() => {
    async function doFetch() {
      setLoading(true)
      const compiledText = await OBSfetchContent(
        'https://git.door43.org/unfoldingWord/en_obs/raw/branch/master/content/'
      )
      setDone(true)
      setLoading(false)
      setMarkupStr(compiledText)
    }
    if (!done && !loading) doFetch()
  })

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const previewProps = {
    openPrintDrawer: isOpen && done,
    handleClosePrintDrawer: () => {
      console.log('closePrintDrawer')
      setIsOpen(false)
    },
    onRenderContent: () => markup(markupStr),
  }
  
  return (
    <div>
      <button onClick={handleClick}>
        Print preview
      </button>
      { done ? <PrintDrawer {...previewProps} /> : 'Fetching OBS data'}
    </div>
  )
}  

<div>
  <Component key="2" />
</div>

```
