# UsfmEditor demo

```js
import { useState, useEffect } from 'react';
import { usfmText } from '../data/tit.en.ult.usfm.js';

function Component () {

  const onSave = (bookCode,usfm) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfm)
  }

  const editorProps = {
    onSave,
    usfmText,
  }
  
  return (
    <div key="1">
      <UsfmEditor {...editorProps} />
    </div>
  );
};  

<Component key="1" />

```
