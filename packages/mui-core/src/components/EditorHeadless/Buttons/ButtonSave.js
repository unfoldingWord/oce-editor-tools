import React, { useCallback, useEffect, useState } from 'react';
import ButtonHeadless from './ButtonHeadless';
import { useEditorContext } from '../Editor';

export default function ButtonSave({ component, children, ...props }) {
  const {
    state: { htmlPerf, epiteleteHtml, bookCode },
    actions: { onSave }
  } = useEditorContext();
  const [canSave, setCanSave] = useState(false);
  useEffect(
    () => {
      setCanSave(
        htmlPerf ? epiteleteHtml.canSavePerf(bookCode) : false
      )
    },
    [htmlPerf, epiteleteHtml, bookCode]
  );
  const save = useCallback(
    async (e) => {
      const usfmText = await epiteleteHtml.readUsfm(bookCode);
      epiteleteHtml.savePerf(bookCode);
      setCanSave(false);
      onSave && onSave(bookCode, usfmText);
    },
    [epiteleteHtml, bookCode, onSave]
  );
  return (
    <ButtonHeadless
      component={component}
      componentProps={{
        value: 'save',
        'aria-label': 'save',
        title: 'Save',
        ...props,
      }}
      canSave={canSave}
      disabled={!canSave}
      onClick={save}
    >
      {children}
    </ButtonHeadless>
  );
}
