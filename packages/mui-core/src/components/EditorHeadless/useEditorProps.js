// eslint-disable-next-line no-unused-vars
import React,
{ useCallback, useMemo, useState }
from 'react';

export default function useEditorProps({
  epiteleteHtml,
  htmlPerf,
  bookId,
  bookCode,
  sequenceIds,
  options,
  verbose,
  setSequenceIds,
  onReferenceSelected,
  sectionIndices,
  setSectionIndices,
  sequenceId,
}) {
  const [graftSequenceId, setGraftSequenceId] = useState(null);
  const {
    sectionable,
    blockable,
    editable,
    preview
  } = options;

  const addSequenceId = useCallback(
    (sequenceId) =>
      setSequenceIds((sequenceIds) => [...sequenceIds, sequenceId]),
    [setSequenceIds]
  );

  const onHtmlPerf = useCallback(
    (_htmlPerf, { sequenceId }) =>
      epiteleteHtml.write(bookCode, sequenceId, _htmlPerf),
    [bookCode, epiteleteHtml]
  );

  const onSectionClick = useCallback(
    ({ content: _content, index }) =>
      setSectionIndices((sectionIndices) => ({
        ...sectionIndices,
        [sequenceId]: index,
      })),
    [setSectionIndices, sequenceId]
  );

  const onBlockClick = ({ content: _content, element }) => {
    const _sequenceId = element.dataset.target;
    if (_sequenceId) {
      setGraftSequenceId(_sequenceId);
    }
  };

  const handlers = {
    onBlockClick,
    onSectionClick,
  };

  const onInput = () => undefined;

  const sectionIndex = useMemo(
    () => sectionIndices[sequenceId] || 0,
    [sectionIndices, sequenceId]
  );

  return {
    sequenceIds,
    addSequenceId,
    htmlPerf,
    onHtmlPerf,
    onInput,
    onReferenceSelected,
    options: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    handlers,
    decorators: {},
    verbose,
    sectionIndex,
    graftSequenceId,
    setGraftSequenceId,
    bookId,
  };
}
