# MdPreview demo

The demo demonstrates how to use the MdPreview in standalone mode.

```js
import { useState, useEffect } from 'react';
import markup from "../lib/drawdown"
import printModalResources from "../lib/printModalResources"

const range = (start, end) => Array.from(
  Array(end - start + 1).keys()
).map(x => x + start)

const zeroPad = (num, places) => String(num).padStart(places, '0')

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const OBSfetchItem = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
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

  const formatData = {
    pageFormat: 'A4P',
    nColumns: 1,
  }

  const substituteCss = (template, replaces) => {
    let ret = template;
    for (let inx = 0; inx < replaces.length; inx++) {
      const [placeholder, replacement] = replaces[inx]
      ret = ret.replace(placeholder, replacement);
    }
    return ret;
  }

  const pageCss = substituteCss(printModalResources.pageCssTemplate, [
    ['%pageWidth%', printModalResources.pageSizes[formatData.pageFormat].width],
    [
      '%pageHeight%',
      printModalResources.pageSizes[formatData.pageFormat].height,
    ],
    ['%nColumns%', formatData.nColumns],
  ])

  const onPrintClick = () => {
    const newPage = window.open();
    newPage.document.body.innerHTML = `<div id="paras">${markup(markupStr)}</div>`;
    newPage.document.head.innerHTML = '<title>PDF Preview</title>';
    const script = document.createElement('script');
    script.src = `${window.location.protocol}//${window.location.host}/static/pagedjs_0_4_0.js`;
    newPage.document.head.appendChild(script);
    const style = document.createElement('style');
    style.innerHTML = pageCss;
    newPage.document.head.appendChild(style);
  }

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
  
  return (
    <div>
      <button onClick={onPrintClick}>
        Print preview
      </button>
      {done ? <MdPreview mdText={markupStr} /> : 'Fetching OBS data'}
    </div>
  );
}  

<div>
  <Component key="1" />
</div>

```
