import React from 'react'
import { HtmlPerfEditor } from "@xelah/type-perf-html";
import Button from '@mui/joy/Button';
import Card from "@mui/joy/Card";
import ModalDialog from '@mui/joy/ModalDialog';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Sheet from '@mui/joy/Sheet';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Sheet {...props} />
    </Draggable>
  );
}

export default function GraftPopup(graftProps) {
  const {
    graftSequenceId,
    setGraftSequenceId,
  } = graftProps

  const handleClickClose = () => {
    setTimeout(() => {
      setGraftSequenceId(null)
    }, 50)
  }

  return (graftSequenceId ?
    <div>
      <ModalDialog
        open={graftSequenceId !== null}
        onClose={handleClickClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Edit a Graft
        </DialogTitle>
        <DialogContent>
          <Card
            onClose={handleClickClose}
            classes={{
              dragIndicator: 'draggable-dialog-title',
              root: 'w-96'
            }}
          >
            { graftSequenceId ? <HtmlPerfEditor key="2" {...graftProps} /> : ''}
          </Card>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickClose}>
            Done
          </Button>
        </DialogActions>
      </ModalDialog>
    </div> : null
  )
}
