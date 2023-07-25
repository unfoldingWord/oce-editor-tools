import React, { useEffect, useState } from 'react';
import { Box, Popper } from '@mui/material';
import { useEditorContext } from '../Editor';
import { getFlatWordObj } from '../../../helpers/getFlatWordObj';
import ButtonHeadless from './ButtonHeadless';
import { isFunction } from '../../../helpers';

export function ButtonAlignmentBroken({
  children,
  component,
  onClick: _onClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [brokenAlignedWords, setBrokenAlignedWords] = useState();
  const { state } = useEditorContext();
  const { epiteleteHtml, bookCode } = state;

  useEffect(
    () =>
      epiteleteHtml?.observeHtml(() => {
        const history = epiteleteHtml.history[bookCode];
        const currentCursor = history.cursor;
        const initialCursor = history.stack.length - 1;
        const currData = history.stack[currentCursor]?.pipelineData;
        const initialData = history.stack[initialCursor]?.pipelineData;
        const initialAlignmentData = getFlatWordObj(
          initialData?.unalignedWords
        );
        const currAlignmentData = getFlatWordObj(currData?.unalignedWords);
        const diffUnaligned = Object.keys(initialAlignmentData)
          .filter((x) => !currAlignmentData[x])
          .concat(
            Object.keys(currAlignmentData).filter(
              (x) => !initialAlignmentData[x]
            )
        );
        setBrokenAlignedWords(diffUnaligned);
      }),
    [epiteleteHtml, bookCode]
  );
  const openPopup = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (isFunction(_onClick)) _onClick(event);
  };

  const allAligned = !brokenAlignedWords || brokenAlignedWords.length === 0;
  const popperOpen = Boolean(anchorEl);
  const id = popperOpen ? 'simple-popper' : undefined;

  return (
    <>
      <ButtonHeadless
        component={component}
        value="alignment"
        aria-label="show broken alignment"
        onClick={openPopup}
        disabled={allAligned}
        allAligned={allAligned}
        title="Alignment"
      >
        {children}
      </ButtonHeadless>
      <Popper id={id} open={popperOpen} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          List of words with broken alignment:
          <Box>
            {brokenAlignedWords &&
              brokenAlignedWords.map((str, i) => <li key={i}>{str}</li>)}
          </Box>
        </Box>
      </Popper>
    </>
  );
}

export default ButtonAlignmentBroken;
