import React, { useEffect, useState } from 'react';
import { useEditorContext } from '../Editor';
import { getFlatWordObj } from '../../../helpers/getFlatWordObj';
import ButtonHeadless from './ButtonHeadless';
import { isFunction } from '../../../helpers';

export function ButtonAlignmentBroken({
  children,
  component,
  onClick: _onClick,
  ...props
}) {
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
  const handleClick = (event) => {
    if (isFunction(_onClick)) _onClick(event);
  };

  const allAligned = !brokenAlignedWords || brokenAlignedWords.length === 0;

  return (
    <>
      <ButtonHeadless
        component={component}
        componentProps={{
          value: 'alignment',
          'aria-label': 'show broken alignment',
          title: 'Alignment',
          ...props,
        }}
        disabled={allAligned}
        onClick={handleClick}
        brokenAlignedWords={brokenAlignedWords}
        allAligned={allAligned}
      >
        {children}
      </ButtonHeadless>
    </>
  );
}

export default ButtonAlignmentBroken;
