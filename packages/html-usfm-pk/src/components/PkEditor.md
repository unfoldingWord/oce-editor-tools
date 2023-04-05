# PkEditor demo

The demo demonstrates using the PkEditor (with all Proskomma / Epitetele handling done through a PkCacheProvider,
 which is included as a wrapper in the app).

```js
import { useState, useEffect } from 'react';
import usePkBookImport from "../hooks/usePkBookImport";
import { usfmText } from '../data/tit.en.ult.usfm.js';
import PkCacheProvider from '../context/LocalPkCacheContext'

function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, bookId, usfmText ) 

  const onSave = (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfmText)
  }

  const editorProps = {
    onSave,
    repoIdStr,
    langIdStr,
    bookId,
  }
  
  return (
      <div key="1">
        { done ? <PkEditor {...editorProps} /> : 'Loading...'}
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```

## Merge demo

The demo demonstrates using the onRenderToolbar to add more buttons in the toolbar.

```js
import { useState, useEffect } from 'react';
import usePkBookImport from "../hooks/usePkBookImport";
import { usfmText } from '../data/tit.en.ult.usfm.js';
import PkCacheProvider from '../context/LocalPkCacheContext'

import { ToggleButton } from '@mui/material'
import { MdUpdate } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'

function Component () {
  const repoIdStr = 'unfoldingWord_ult'
  const langIdStr = 'en'
  const bookId = 'TIT'

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, bookId, usfmText ) 

  const onSave = (bookCode,usfmText) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfmText)
  }

// TODO: hook these up to API
  const needToMergeFromMaster = true;
  const mergeFromMasterHasConflicts = false;
  const mergeToMasterHasConflicts = true;

  // eslint-disable-next-line no-nested-ternary
  const mergeFromMasterTitle = mergeFromMasterHasConflicts
    ? 'Merge Conflicts for update from master'
    : needToMergeFromMaster
      ? 'Update from master'
      : 'No merge conflicts for update with master';
  // eslint-disable-next-line no-nested-ternary
  const mergeFromMasterColor = mergeFromMasterHasConflicts
    ? 'red'
    : needToMergeFromMaster
      ? 'orange'
      : 'lightgray';
  const mergeToMasterTitle = mergeToMasterHasConflicts
    ? 'Merge Conflicts for share with master'
    : 'No merge conflicts for share with master';
  const mergeToMasterColor = mergeToMasterHasConflicts ? 'red' : 'black';

  const onRenderToolbar = ({ items }) => [
    ...items,
    <ToggleButton
      key="update-from-master"
      value="update-from-master"
      onClick={() => {}}
      title={mergeFromMasterTitle}
      aria-label={mergeFromMasterTitle}
      style={{ cursor: 'pointer' }}
    >
      <MdUpdate id="update-from-master-icon" color={mergeFromMasterColor} />
    </ToggleButton>,
    <ToggleButton
      key="share-to-master"
      value="share-to-master"
      onClick={() => {}}
      title={mergeToMasterTitle}
      aria-label={mergeToMasterTitle}
      style={{ cursor: 'pointer' }}
    >
      <FiShare id="share-to-master-icon" color={mergeToMasterColor} />
    </ToggleButton>,
  ];

  const editorProps = {
    onSave,
    repoIdStr,
    langIdStr,
    bookId,
    onRenderToolbar,
    verbose: true,
  }
  
  return (
      <div key="1">
        { done ? <PkEditor {...editorProps} /> : 'Loading...'}
      </div>
  );
};  

<PkCacheProvider>
  <Component key="1" />
</PkCacheProvider>

```
