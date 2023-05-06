# BookPreview demo

The demo demonstrates the BookPreview component.

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
        <BookPreview {...previewProps} />
      </div>
  );
};  

<div>
  <Component key="1" />
</div>

```
