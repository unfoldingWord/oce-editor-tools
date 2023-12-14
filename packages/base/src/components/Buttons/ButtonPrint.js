import React, { useCallback } from 'react';
import ButtonHeadless from './ButtonHeadless';
import { useEditorContext } from '../../context/EditorCacheProvider';

export default function ButtonPrint({ component, children, ...props }) {
  const {
    state: { epiteleteHtml, bookCode },
    actions: { onPrintPreview }
  } = useEditorContext();
  const canPrintPreview = true
  const print = useCallback(
    async (e) => {
      const usfmText = await epiteleteHtml.readUsfm(bookCode);
      onPrintPreview && onPrintPreview(bookCode, usfmText);
    },
    [epiteleteHtml, bookCode, onPrintPreview]
  );
  return (
    <ButtonHeadless
      component={component}
      componentProps={{
        value: 'print',
        'aria-label': 'print preview',
        title: 'Print preview',
        ...props,
      }}
      canPrintPreview={canPrintPreview}
      disabled={!canPrintPreview}
      onClick={print}
    >
      {children}
    </ButtonHeadless>
  );
}
