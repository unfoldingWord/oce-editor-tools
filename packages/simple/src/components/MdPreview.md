# MdPreview demo

The demo demonstrates how to use the MdPreview in standalone mode.

```js
import { useState } from 'react';

function Component () {
  const [markupStr, setMarkupStr] = useState("");

  const url = 'https://git.door43.org/unfoldingWord/en_obs/raw/branch/master/content/01.md'

  fetch(url)
    .then((response) => {
      response.text().then((text) => {
        setMarkupStr(text)
      });
    });
  
  return (
    <div key="1">
      <MdPreview mdText={markupStr} />
    </div>
  );
};  

<div>
  <Component key="1" />
</div>

```
