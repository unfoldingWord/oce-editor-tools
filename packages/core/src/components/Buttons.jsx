import React, { useCallback, useMemo } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
    <ToggleButtonGroup
      data-test-id="ToggleButtonGroup"
      value={toggles}
      onChange={handleToggles}
      aria-label="text formatting"
      className="buttons"
      sx={{
        mb:2,
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        background: theme.palette.background.default
      }}
    >
      { showToggles && (<ToggleButton
        data-test-id="ToggleButtonSectionable"
        value="sectionable"
        aria-label="sectionable"
        title="Sectionable"
      >
        <ViewStream />
      </ToggleButton>)}
      { showToggles && (<ToggleButton
        data-test-id="ToggleButtonBlockable"
        value="blockable"
        aria-label="blockable"
        title="Blockable"
      >
        <Subject />
      </ToggleButton>)}
      { showToggles && (<ToggleButton
        data-test-id="ToggleButtonPreview"
        value="preview"
        aria-label="preview"
        title="Preview"
      >
        <Preview />
      </ToggleButton>)}
      <ToggleButton
        data-test-id="ToggleButtonEditable"
        value="editable"
        aria-label="editable"
        title="Editable"
      >
        <Edit />
      </ToggleButton>
      <Extensible onRenderItems={onRenderToolbar}>
        <Button
          data-test-id="ButtonAssignmentData"
          value="alignment"
          aria-label="alignment"
          onClick={handleAssignmentDataClick}
          disabled={allAligned}
          title="Alignment"
        >
          {allAligned ? <AssignmentTurnedIn /> : <AssignmentLate />}
        </Button>
        <Button
          data-test-id="Undo"
          value="undo"
          aria-label="undo"
          onClick={handleUndo}
          disabled={!canUndo}
          title='Undo'
        >
          <Undo />
        </Button>
        <Button
          data-test-id="Redo"
          value="redo"
          aria-label="redo"
          onClick={handleRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo />
        </Button>
        <Button
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