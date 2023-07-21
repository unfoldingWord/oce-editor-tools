import React, { useCallback, useMemo } from "react";
import { Box, Button, ToggleButtonGroup } from "@mui/material";
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
import ButtonAlignmentBroken from "./ButtonAlignmentBroken";
import { ButtonsOptions } from "./ButtonsOptions";
import ButtonUndo from "./ButtonUndo";
import ButtonRedo from "./ButtonRedo";
import ButtonSave from "./ButtonSave";

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
  const theme = useTheme()
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
        aria-label="text formatting"
        className="buttons"
        sx={{ background: theme.palette.background.default }}
      >
        <ButtonsOptions showToggles={showToggles} />
        <Extensible onRenderItems={onRenderToolbar}>
          <ButtonAlignmentBroken component={Button}>
            {({ allAligned }) =>
              allAligned ? <AssignmentTurnedIn /> : <AssignmentLate />
            }
          </ButtonAlignmentBroken>
          <ButtonUndo component={Button}>
            <Undo />
          </ButtonUndo>
          <ButtonRedo component={Button}>
            <Redo />
          </ButtonRedo>
          <ButtonSave component={Button}>
            <Save />
          </ButtonSave>
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