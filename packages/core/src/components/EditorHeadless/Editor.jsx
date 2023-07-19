import { createContext, useContext } from 'react';
import useEditorState from './useEditorState';

export const EditorContext = createContext({});
export const useEditorContext = () => useContext(EditorContext);

export function EditorContainer({
  onSave,
  epiteleteHtml,
  sourceId,
  bookId,
  verbose,
  bcvSyncRef,
  reference,
  setReference = () => null,
  scrollLock,
  scrollDelay,
  children,
  defaultOptions
}) {

  const { actions, state } = useEditorState({
    epiteleteHtml,
    sourceId,
    bookId,
    defaultOptions,
    bcvSyncRef,
    reference,
    setReference,
    scrollDelay,
    scrollLock,
  });

  const context = {
    state: {
      verbose,
      epiteleteHtml,
      ...state
    },
    actions: {
      onSave,
      ...actions
    },
  };
  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
}

export default EditorContainer;
