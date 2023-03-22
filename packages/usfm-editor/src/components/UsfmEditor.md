# UsfmEditor demo

```js
import { useState, useEffect } from 'react';
// import { usfmText } from '../data/tit.en.ult.usfm.js';
import { usfmText } from '../data/Acts.1.usfm.js';

import { ToggleButton } from '@mui/material'
import { MdUpdate } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'

function Component () {

  const onSave = (bookCode,usfm) => {
    console.log("save button clicked")
    console.log(bookCode)
    console.log(usfm)
  }

  const onReferenceSelected = (reference) => console.log(reference)

// TODO: hook these up to API
  const needToMergeFromMaster = true
  const mergeFromMasterHasConflicts = false
  const mergeToMasterHasConflicts = true

  // eslint-disable-next-line no-nested-ternary
  const mergeFromMasterTitle = mergeFromMasterHasConflicts ? 'Merge Conflicts for update from master' : (needToMergeFromMaster ? 'Update from master' : 'No merge conflicts for update with master')
  // eslint-disable-next-line no-nested-ternary
  const mergeFromMasterColor = mergeFromMasterHasConflicts ? 'red' : (needToMergeFromMaster ? 'orange' : 'lightgray')
  const mergeToMasterTitle = mergeToMasterHasConflicts ? 'Merge Conflicts for share with master' : 'No merge conflicts for share with master'
  const mergeToMasterColor = mergeToMasterHasConflicts ? 'red' : 'black'

  const onRenderToolbar = ({ items }) => [
    ...items,
    <ToggleButton
      key='update-from-master'
      value='update-from-master'
      onClick={() => { }}
      title={mergeFromMasterTitle}
      aria-label={mergeFromMasterTitle}
      style={{ cursor: 'pointer' }}
    >
      <MdUpdate id='update-from-master-icon' color={mergeFromMasterColor} />
    </ToggleButton>,
    <ToggleButton
      key='share-to-master'
      value='share-to-master'
      onClick={() => { }}
      title={mergeToMasterTitle}
      aria-label={mergeToMasterTitle}
      style={{ cursor: 'pointer' }}
    >
      <FiShare id='share-to-master-icon' color={mergeToMasterColor} />
    </ToggleButton>,
  ]

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
