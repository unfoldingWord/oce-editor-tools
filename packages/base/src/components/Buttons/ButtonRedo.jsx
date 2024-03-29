import React, { useCallback, useMemo } from 'react';
import ButtonHeadless from './ButtonHeadless';
import { useEditorContext } from '../../context/EditorCacheProvider';

export default function ButtonRedo({ component, children, ...props }) {
  const {
    state: { htmlPerf, epiteleteHtml, bookCode },
  } = useEditorContext();
  const canRedo = useMemo(
    () => (htmlPerf ? epiteleteHtml.canRedo(bookCode) : false),
    [htmlPerf, epiteleteHtml, bookCode]
  );
  const redo = useCallback(
    (e) => {
      epiteleteHtml.redo(bookCode);
    },
    [epiteleteHtml, bookCode]
  );
  return (
    <ButtonHeadless
      component={component}
      componentProps={{
        value: 'redo',
        'aria-label': 'redo',
        title: 'Redo',
        ...props,
      }}
      disabled={!canRedo}
      onClick={redo}
    >
      {children}
    </ButtonHeadless>
  );
}
