## Package: Simple
#### Other packages in the same monorepo: 

core - https://oce-editor-tools-mui-core.netlify.app/

pk - https://oce-editor-tools-mui-pk.netlify.app/

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
    reference: {
      syncSrcId: "1",
      bookId: 'apg',
      chapter: 1,
      verse: "24-25",
    }
  }

  const displayFont = 'sans-serif';
  const displayFontSize = 'medium';
  const displayLineHeight = '1.4';

  return (
    <div key="1" style={{ fontFamily: displayFont, fontSize: displayFontSize, lineHeight: displayLineHeight }}>
      <UsfmEditor {...editorProps} />
    </div>
  );
};  

<Component key="1" />

```
