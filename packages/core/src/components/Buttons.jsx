import React, { useCallback, useMemo } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Extensible } from "@gwdevs/extensible-rcl";
import {
  ViewStream,
  Subject,
  Edit,
  Preview,
  Undo,
  Redo, 
  Save,
  AssignmentTurnedIn,
  AssignmentLate,
} from '@mui/icons-material'
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme()
  const toggles = togglesAll.filter((toggle) => props[toggle]);

  const handleToggles = useCallback(
    (event, newToggles) => {
      const _toggles = {};

      togglesAll.forEach((toggle) => {
        _toggles[toggle] = newToggles.includes(toggle);
      });

      setToggles(_toggles);
    },
    [setToggles, togglesAll]
  );

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
      <ToggleButton
        data-test-id="ButtonAssignmentData"
        value="alignment"
        aria-label="alignment"
        onClick={handleAssignmentDataClick}
        disabled={allAligned}
        title="Alignment"
      >
        {allAligned ? <AssignmentTurnedIn /> : <AssignmentLate />}
      </ToggleButton>
      <ToggleButton
        data-test-id="Undo"
        value="undo"
        aria-label="undo"
        onClick={handleUndo}
        disabled={!canUndo}
        title='Undo'
      >
        <Undo />
      </ToggleButton>
      <ToggleButton
        data-test-id="Redo"
        value="redo"
        aria-label="redo"
        onClick={handleRedo}
        disabled={!canRedo}
        title="Redo"
      >
        <Redo />
      </ToggleButton>
      <ToggleButton
        data-test-id="Save"
        value="save"
        aria-label="save"
        onClick={onSave}
        disabled={!canSave}
        title="Save"
      >
        <Save />
      </ToggleButton>
      <Extensible onRenderItems={onRenderToolbar}/>
    </ToggleButtonGroup>
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