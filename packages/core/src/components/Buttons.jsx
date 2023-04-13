import React, { useState, useMemo } from "react";
import { Button } from "@mui/material";
import { Extensible } from "@gwdevs/extensible-rcl";
import {
  ViewStream,
  Subject,
  Edit,
  EditOff,
  Preview,
  Undo,
  Redo, 
  Save,
  AssignmentTurnedIn,
  AssignmentLate,
} from '@mui/icons-material'
import PropTypes from 'prop-types';

export default function Buttons(props) {
  const { 
    canUndo, 
    canRedo, 
    setToggles, 
    undo, 
    redo, 
    onShowUnaligned, 
    allAligned, 
    onSave, 
    canSave,
    showToggles,
    onRenderToolbar
  } = props;
  const togglesAll = useMemo(
    () => ["sectionable", "blockable", "editable", "preview"],
    []
  );
  const [locToggles,setLocToggles] = useState(togglesAll.filter((toggle) => props[toggle]))

  const handleUndo = (event) => {
    undo();
    event.preventDefault();
    return false;
  };

  const handleRedo = (event) => {
    redo();
    event.preventDefault();
    return false;
  };

  const isSetToggle = (toggle) => locToggles.includes(toggle)

  const handleToggleClick = (toggle) => {
    let _toggles = []
    if (locToggles.includes(toggle)) {
      _toggles = locToggles.filter(item => item !== toggle)
    } else {
      _toggles = [toggle, ...locToggles]
    }
    setLocToggles(_toggles)
    setToggles(_toggles);
  }

  const handleAssignmentDataClick = (event) => {
    onShowUnaligned(event);
    event.preventDefault();
    return false;
  };

  return (
    <>
      <Extensible onRenderItems={onRenderToolbar}>
      { showToggles && (<Button
        data-test-id="ButtonSectionable"
        value="sectionable"
        aria-label="sectionable"
        title="Sectionable"
        onClick={() => handleToggleClick("sectionable")}
        sx={!isSetToggle("sectionable") ? { color: 'grey'} : undefined }
      >
        <ViewStream />
      </Button>)}
      { showToggles && (<Button
        data-test-id="ButtonBlockable"
        value="blockable"
        aria-label="blockable"
        title="Blockable"
        onClick={() => handleToggleClick("blockable")}
        sx={!isSetToggle("blockable") ? { color: 'grey'} : undefined }
      >
        <Subject />
      </Button>)}
      { showToggles && (<Button
        data-test-id="ButtonPreview"
        value="preview"
        aria-label="preview"
        title="Preview"
        onClick={() => handleToggleClick("preview")}
        sx={!isSetToggle("preview") ? { color: 'grey'} : undefined }
      >
        <Preview />
      </Button>)}
      <Button
        data-test-id="ButtonEditable"
        value="editable"
        aria-label="editable"
        title="Editable"
        sx={!isSetToggle("editable") ? { color: 'grey'} : undefined }
        onClick={() => handleToggleClick("editable")}
      >
        {isSetToggle("editable") ? <Edit /> : <EditOff />}        
      </Button>
      <Button
        data-test-id="ButtonAssignmentData"
        value="alignment"
        aria-label="alignment"
        onClick={handleAssignmentDataClick}
        disabled={allAligned}
        title="Alignment"
      >
     {allAligned ? <AssignmentTurnedIn /> : <AssignmentLate />}
      </Button><Button
        data-test-id="Undo"
        value="undo"
        aria-label="undo"
        onClick={handleUndo}
        disabled={!canUndo}
        title='Undo'
      >
        <Undo />
      </Button><Button
        data-test-id="Redo"
        value="redo"
        aria-label="redo"
        onClick={handleRedo}
        disabled={!canRedo}
        title="Redo"
      >
        <Redo />
      </Button><Button
        data-test-id="Save"
        value="save"
        aria-label="save"
        onClick={onSave}
        disabled={!canSave}
        title="Save"
      >
        <Save />
      </Button>
      </Extensible>
    </>
  );
}
Buttons.propTypes = {
  setToggles: PropTypes.func.isRequired,
  undo: PropTypes.func,
  redo: PropTypes.func,
  onSave: PropTypes.func,
  canUndo: PropTypes.bool,
  canRedo: PropTypes.bool,
  editable: PropTypes.bool,
  preview: PropTypes.bool,
  onShowUnaligned: PropTypes.func,
  allAligned: PropTypes.bool,
  canSave: PropTypes.bool,
  showToggles: PropTypes.bool,
};