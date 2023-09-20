import React from 'react';
import { FindrMUI, Mark } from '@findr/mui';
import { useFindr } from '@findr/react';
import { Collapse, Paper } from '@mui/material';
import { useEditorContext } from './EditorHeadless/Editor';

//TODO: create a headless version of find replace
export function FindReplace({
  onClickResult = () => null,
  onReplace: _onReplace = () => null,
  onSearch: _onSearch = () => null,
  onChangeOptions: _onChangeOptions = () => null,
  onChangeTarget: _onChangeTarget = () => null,
}) {
  const {
    actions: { setHighlighterTarget, setHighlighterOptions, setOption: setEditorOption, setReference: onSetReference },
    state: { epiteleteHtml, bookCode, options: editorOptions, sourceId },
  } = useEditorContext();

  const { search: open } = editorOptions;
  const sourceKey = `${sourceId}/${bookCode}`;

  async function findOrReplace(params) {
    const {
      options,
      target,
      replacement,
      resultsKeys: replacementKeys,
    } = params;
    const data = {
      perf: {},
      params: {
        target,
        replacement,
        replacementKeys,
        config: { ...options, ctxLen: 30 },
      },
    };
    return await epiteleteHtml.makeDocumentReport(
      bookCode,
      'findAndReplace',
      data
    );
  }

  const buildResults = (report, sourceKey) =>
    Object.values(report?.results).map((result) => ({
      ...result,
      sourceKey,
    }));
  
  const onTargetChanged = (target) => {
    setHighlighterTarget(target);
    _onChangeTarget(target);
  };

  const onOptionsChanged = (options) => {
    setHighlighterOptions(options);
    _onChangeOptions(target);
  }

  const onSearch = async (params) => {
    if (!epiteleteHtml) return;
    if (params.target === " ") {
      return []
    }
    onTargetChanged(params.target);
    onOptionsChanged(params.options);
    const report = await findOrReplace(params);
    const results = buildResults(report, sourceKey);
    _onSearch(results);
    return results;
  };

  const onReplace = async (params) => {
    if (!epiteleteHtml) return;
    const report = await findOrReplace(params);
    const sequenceId = report.perf.main_sequence_id;
    const perfHtml = epiteleteHtml._outputHtml(report.perf);
    await epiteleteHtml.write(bookCode, sequenceId, perfHtml);
    const results = buildResults(report, sourceKey)
    _onReplace(results);
    return results;
  };

  const {
    actions: fnrActions,
    state: fnrState,
    events: fnrEvents,
  } = useFindr({ sourcesKeys: [sourceKey], onSearch, onReplace });

  const { setOptions, setGroups } = fnrActions ?? {};
  const { target, replacement, groups, options: fnrOptions } = fnrState ?? {};
  const {
    onChangeTarget,
    onChangeReplacement,
    onReplaceGroup,
    onReplaceResult,
    onReplaceAll,
  } = fnrEvents ?? {};

  const setResultTooltip = ({ result }) => {
    const { bookCode, chapter, verses } = result.metadata;
    return `${bookCode} ${chapter}:${verses}`;
  };

  const setReference = ({ result }) => {
    const { sourceKey, metadata } = result;
    const { bookCode, chapter, verses } = metadata;
    //TODO: include a callback for resetting card's reference
    onSetReference({
      sourceId: sourceKey.split('/')[0],
      bookId: bookCode,
      chapter,
      verse: verses,
    });
    onClickResult({ bookId: bookCode, chapter, verse: verses });
    setEditorOption("search", false);
  };

  const setGroupCaption = ({ key: sourceKey }) => {
    // const [server, id, bookCode] = sourceKey.split('/');;
    return `(${sourceKey})`;
  };

  const setGroupTitle = ({ key: sourceKey }) => {
    // const [server, id, bookCode] = sourceKey.split("/");
    return `Results`;
  };

  const __onChangeTarget = (event) => {
    const newTarget = event.target.value;
    if(!newTarget) onTargetChanged(null);
    return onChangeTarget(event)
  }

  const fnrProps = {
    setGroups,
    onChangeTarget: __onChangeTarget,
    onChangeReplacement,
    onReplaceGroup,
    onReplaceResult,
    onReplaceAll,
    onChangeOptions: setOptions,
    options: fnrOptions,
    onSetResultTooltip: setResultTooltip,
    onClickResult: setReference,
    onSetGroupCaption: setGroupCaption,
    onSetGroupTitle: setGroupTitle,
    target,
    replacement,
    groups,
    onRenderResult: ({ nodes, data }) => {
      const { bookCode, chapter, verses } = data.metadata;
      return (
        <>
          <Mark
            color={'rgb(239 239 239)'}
            style={{ fontSize: '0.7rem', marginRight: '0.5rem' }}
          >
            {`${bookCode.toLowerCase()} ${chapter}:${verses}`}
          </Mark>
          {nodes}
        </>
      );
    },
  };

  return (
    <Collapse in={open} timeout={0}>
      <Paper elevation={1} sx={{ mb: '1em', pb: '0.5em', position: 'sticky' }}>
        <FindrMUI
          sx={{ padding: '0.5em', margin: '0em 0.5em' }}
          {...fnrProps}
        />
      </Paper>
    </Collapse>
  );
}

export default FindReplace