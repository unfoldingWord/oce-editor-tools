import React, { createContext, useContext } from 'react';
import useEditorState from '../components/useEditorState';

export const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext);

export function EditorCacheProvider({
  onSave,
  onPrintPreview,
  epiteleteHtml,
  sourceId,
  bookId,
  verbose,
  reference,
  setReference = () => null,
  scrollDelay,
  children,
  defaultOptions
}) {

  const { actions, state } = useEditorState({
    epiteleteHtml,
    sourceId,
    bookId,
    defaultOptions,
    reference,
    setReference,
    scrollDelay,
  });

  const context = {
    state: {
      verbose,
      epiteleteHtml,
      ...state
    },
    actions: {
      onSave,
      onPrintPreview,
      ...actions
    }
  };
  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
}

export default EditorCacheProvider;
