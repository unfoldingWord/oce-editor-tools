import React from 'react'
import { HtmlPerfEditor } from "@xelah/type-perf-html";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
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
      <Dialog
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
      </Dialog>
    </div> : null
  )
}
