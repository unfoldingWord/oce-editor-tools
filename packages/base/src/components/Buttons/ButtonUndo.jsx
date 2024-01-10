import React, { useCallback, useMemo } from 'react'
import ButtonHeadless from './ButtonHeadless';
import { useEditorContext } from '../../context/EditorCacheProvider';

export default function ButtonUndo({ component, children, ...props }) {
  const { state: { htmlPerf, epiteleteHtml, bookCode } } = useEditorContext()
  const canUndo = useMemo(
    () => (htmlPerf ? epiteleteHtml.canUndo(bookCode) : false),
    [htmlPerf, epiteleteHtml, bookCode]
  );
  const undo = useCallback(
    (e) => {
      epiteleteHtml.undo(bookCode);
    },
    [epiteleteHtml,bookCode]
  );
  return (
    <ButtonHeadless
      component={component}
      componentProps={{
        value: 'undo',
        'aria-label': 'undo',
        title: 'Undo',
        ...props,
      }}
      disabled={!canUndo}
      onClick={undo}
    >
      {children}
    </ButtonHeadless>
  );
}
