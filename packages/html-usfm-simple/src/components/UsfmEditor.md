# UsfmEditor demo

```js
import { useState, useEffect } from 'react';
// import { usfmText } from '../data/tit.en.ult.usfm.js';
import { usfmText } from '../data/Acts.1.usfm.js';

function Component () {

  const onSave = (bookCode,usfm) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfm)
  }

  const onReferenceSelected = (reference) => console.log(reference)

  const editorProps = {
    onSave,
    usfmText,
    onReferenceSelected,
    onRenderToolbar,
    activeReference: {
      bookId: 'apg',
      chapter: 1,
      verse: "24-25",
    }
  }
  
  return (
    <div key="1">
      <UsfmEditor {...editorProps} />
    </div>
  );
};  

<Component key="1" />

```
