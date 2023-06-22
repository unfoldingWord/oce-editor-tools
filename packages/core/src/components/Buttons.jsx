import React, { useCallback, useMemo } from "react";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
  Search,
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
    onSearch, 
    showToggles,
    onRenderToolbar,
    content,
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
    <Box
      sx={{
        mb: 2,
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
      }}
    >
      <ToggleButtonGroup
        data-test-id="ToggleButtonGroup"
        value={toggles}
        onChange={handleToggles}
        aria-label="text formatting"
        className="buttons"
        sx={{ background: theme.palette.background.default }}
      >
        {showToggles && (
          <ToggleButton
            data-test-id="ToggleButtonSectionable"
            value="sectionable"
            aria-label="sectionable"
            title="Sectionable"
          >
            <ViewStream />
          </ToggleButton>
        )}
        {showToggles && (
          <ToggleButton
            data-test-id="ToggleButtonBlockable"
            value="blockable"
            aria-label="blockable"
            title="Blockable"
          >
            <Subject />
          </ToggleButton>
        )}
        {showToggles && (
          <ToggleButton
            data-test-id="ToggleButtonPreview"
            value="preview"
            aria-label="preview"
            title="Preview"
          >
            <Preview />
          </ToggleButton>
        )}
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
            title="Undo"
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
          <Button
            data-test-id="ButtonSearch"
            value="search"
            aria-label="search"
            onClick={onSearch}
            title="Search"
          >
            <Search />
          </Button>
        </Extensible>
      </ToggleButtonGroup>
      <Box>{content}</Box>
    </Box>
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
  onSearch: PropTypes.func,
  showToggles: PropTypes.bool,
};