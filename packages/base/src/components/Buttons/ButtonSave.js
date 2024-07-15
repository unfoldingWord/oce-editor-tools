import React, { useCallback, useEffect, useState } from 'react';
import ButtonHeadless from './ButtonHeadless';
import { useEditorContext } from '../../context/EditorCacheProvider';
import { readOptions } from '../../constants';

export default function ButtonSave({ component, children, ...props }) {
  const {
    state,
    actions: { onSave }
  } = useEditorContext();
  const { htmlPerf, epiteleteHtml, bookCode, options } = state;

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
      const usfmText = await epiteleteHtml.readUsfm(bookCode, options?.stripAlignment ? readOptions : undefined );
      epiteleteHtml.savePerf(bookCode);
      setCanSave(false);
      onSave && onSave(bookCode, usfmText);
    },
    [epiteleteHtml, bookCode, onSave, options.stripAlignment]
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
