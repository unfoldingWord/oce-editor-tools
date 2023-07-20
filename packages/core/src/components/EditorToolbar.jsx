import React from 'react';
import EditorPack from './EditorHeadless';
import Button from './EditorHeadless/Buttons';
import { Box, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
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

const ToolbarButton = styled(ToggleButton)({
  border: 'none',
  '&.Mui-disabled': {
    border: 'none',
  },
});

export function EditorToolbar({ showToggles, onRenderToolbar }) {
  return (
    <Box
      sx={{
        mb: 1.5,
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
      }}
    >
      <EditorPack.Toolbar
        component={Box}
        sx={{
          width: 'fit-content',
          maxWidth: '100%',
          background: (theme) => theme.palette.background.default,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
        }}
      >
        <Button.Editable component={ToolbarButton}>
          <Edit />
        </Button.Editable>
        {/* <Button.Lock component={ToolbarButton}>
          {({selected}) => selected ? <Lock/> : <LockOpen/>}
        </Button.Lock> */}
        {showToggles ? (
          <>
            <Button.Sectionable component={ToolbarButton}>
              <ViewStream />
            </Button.Sectionable>
            <Button.Blockable component={ToolbarButton}>
              <Subject />
            </Button.Blockable>
            <Button.Preview component={ToolbarButton}>
              <Preview />
            </Button.Preview>
          </>
        ) : null}
        <Button.AlignmentBroken component={ToolbarButton}>
          {({ allAligned }) =>
            allAligned ? <AssignmentTurnedIn /> : <AssignmentLate />
          }
        </Button.AlignmentBroken>
        <Extensible onRenderItems={onRenderToolbar}>
          <Button.Undo component={ToolbarButton}>
            <Undo />
          </Button.Undo>
          <Button.Redo component={ToolbarButton}>
            <Redo />
          </Button.Redo>
          <Button.Save component={ToolbarButton}>
            <Save />
          </Button.Save>
          <Button.Search component={ToolbarButton}>
            <Search />
          </Button.Search>
        </Extensible>
      </EditorPack.Toolbar>
      <Box>
        <FindReplace />
      </Box>
    </Box>
  );
}
