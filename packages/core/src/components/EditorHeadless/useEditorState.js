import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { readOptions, writeOptions } from '../../constants';
import useEditorOptions from './useEditorOptions';
import useEditorProps from './useEditorProps';
import useReferenceHandler from './useReferenceHandler';

export default function useEditorState({
  sourceId: _sourceId,
  bookId,
  epiteleteHtml,
  defaultOptions,
  verbose,
  reference,
  setReference,
  scrollDelay
}) {
  const sourceId = _sourceId ?? epiteleteHtml.docSetId;
  const editorRef = useRef(null);
  const [htmlPerf, setHtmlPerf] = useState();
  const [sequenceIds, setSequenceIds] = useState(null);
  const [highlighterTarget, setHighlighterTarget] = useState(null);
  const [highlighterOptions, setHighlighterOptions] = useState(null);
  const [sectionIndices, setSectionIndices] = useState({});
  const sequenceId = sequenceIds?.at(-1);
  const bookCode = useMemo(() => bookId.toUpperCase(), [bookId]);

  const { state: optionsState, actions: optionsActions } =
    useEditorOptions(defaultOptions);

  const { state: referenceState, actions: referenceActions } =
    useReferenceHandler({
      editorRef,
      sourceId,
      reference,
      setReference,
      locked: optionsState.options.locked,
      scrollDelay,
      htmlPerf,
      sequenceId,
      sectionIndices,
      setSectionIndices,
      epiteleteHtml,
      verbose,
    });

  const editorProps = useEditorProps({
    epiteleteHtml,
    htmlPerf,
    bookId,
    bookCode,
    sequenceIds,
    options: optionsState.options,
    verbose,
    setSequenceIds,
    onReferenceSelected: referenceActions.setReference,
    sectionIndices,
    setSectionIndices,
    sequenceId,
  });

  const updateEditor = useCallback(
    (epiteleteHtml, bookCode) =>
      epiteleteHtml.read(bookCode).then((htmlPerf) => {
        setHtmlPerf(htmlPerf);
        setSequenceIds([htmlPerf.mainSequenceId]);
      }),
    [setSequenceIds]
  );

  useEffect(() => {
    epiteleteHtml.read = (bookCode) => {
      return epiteleteHtml.readHtml(bookCode, readOptions);
    };
    epiteleteHtml.write = (bookCode, sequenceId, htmlPerf) => {
      return epiteleteHtml.writeHtml(
        bookCode,
        sequenceId,
        htmlPerf,
        writeOptions
      );
    };
    const unobserveHtml = epiteleteHtml.observeHtml(({ data: htmlPerf }) =>
      setHtmlPerf(htmlPerf)
    );
    updateEditor(epiteleteHtml, bookCode);
    return unobserveHtml;
  }, [epiteleteHtml, bookCode, updateEditor]);

  const state = {
    htmlPerf,
    sourceId,
    sequenceIds,
    bookCode,
    highlighterTarget,
    highlighterOptions,
    editorRef,
    editorProps,
    sectionIndices,
    ...optionsState,
    ...referenceState,
  };
  const actions = {
    setSequenceIds,
    setHtmlPerf,
    setHighlighterTarget,
    setHighlighterOptions,
    ...optionsActions,
    ...referenceActions,
  };

  return { state, actions };
}

useEditorState.propTypes = {
  sequenceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};
