import React, { useState } from 'react';
import { Toolbar, Button } from "@oce-editor-tools/base"
import { Box } from '@mui/joy'
import { Button as ToggleButton } from './basic/Button'
import { Popper } from '@mui/base'
import {
  AssignmentLate,
  AssignmentTurnedIn,
  Edit,
  Lock,
  LockOpen,
  Preview,
  Redo,
  Save,
  Search,
  Subject,
  Undo,
  ViewStream,
} from '@mui/icons-material';

import { Extensible } from '@gwdevs/extensible-rcl';
import FindReplace from './FindReplace';

export function BrokenAlignmentsPopper({ anchorEl, brokenAlignedWords }) {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return <Popper id={id} open={open} anchorEl={anchorEl}>
    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
      List of words with broken alignment:
      <Box>
        {brokenAlignedWords &&
          brokenAlignedWords.map((str, i) => <li key={i}>{str}</li>)}
      </Box>
    </Box>
  </Popper>;
}

let brokenAlignedWords = []
export function EditorToolbar({ showToggles, onRenderToolbar }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const openPopup = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Box
      sx={{
        mb: 1.5,
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
      }}
    >
      <Toolbar
        component={Box}
        sx={{
          width: 'fit-content',
          maxWidth: '100%',
          background: (theme) => theme.palette.background.default,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
        }}
      >
        <Button.Editable component={ToggleButton}>
          <Edit />
        </Button.Editable>
        {showToggles ? (
          <>
            <Button.Sectionable component={ToggleButton}>
              <ViewStream />
            </Button.Sectionable>
            <Button.Blockable component={ToggleButton}>
              <Subject />
            </Button.Blockable>
            <Button.Preview component={ToggleButton}>
              <Preview />
            </Button.Preview>
          </>
        ) : null}
        <Extensible onRenderItems={onRenderToolbar}>
          <Button.Lock component={ToggleButton}>
            {({ selected }) => (selected ? <Lock /> : <LockOpen />)}
          </Button.Lock>
          <Button.AlignmentBroken component={ToggleButton} onClick={openPopup}>
            {({ allAligned, brokenAlignedWords: b }) => {
              brokenAlignedWords = b;
              return allAligned ? <AssignmentTurnedIn /> : <AssignmentLate />;
            }}
          </Button.AlignmentBroken>
          <BrokenAlignmentsPopper anchorEl={anchorEl} brokenAlignedWords={brokenAlignedWords}/>
          <Button.Undo component={ToggleButton}>
            <Undo />
          </Button.Undo>
          <Button.Redo component={ToggleButton}>
            <Redo />
          </Button.Redo>
          <Button.Save component={ToggleButton}>
            <Save />
          </Button.Save>
          <Button.Search component={ToggleButton}>
            <Search />
          </Button.Search>
        </Extensible>
      </Toolbar>
      <Box>
        <FindReplace />
      </Box>
    </Box>
  );
}
