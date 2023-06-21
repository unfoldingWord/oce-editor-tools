import { FindrMUI, Mark } from '@findr/mui';
import { useFindr } from '@findr/react';
import { Collapse, Paper } from '@mui/material';

export function FindReplace({ epitelete, bookCode, onReplace: _onReplace, open }) {
  const sourceKey = `${epitelete.docSetId}/${bookCode}`;

  async function findOrReplace(params) {
    const { options, target, replacement, resultsKeys: replacementKeys } = params;
    const data = {
      perf: {},
      params: {
        target,
        replacement,
        replacementKeys,
        config: { ...options, ctxLen: 30 },
      },
    };
    return await epitelete.makeDocumentReport(
      bookCode,
      'findAndReplace',
      data
    );
  }

  const buildResults = (report,sourceKey) => Object.values(report?.results).map((result) => ({
    ...result,
    sourceKey,
  }));

  const onSearch = async (params) => {
    if (!epitelete) return;
    const report = await findOrReplace(params);
    return buildResults(report,sourceKey)
  };

  const onReplace = async (params) => {
    if (!epitelete) return;
    const report = await findOrReplace(params);
    const sequenceId = report.perf.main_sequence_id;
    const sequence = report.perf.sequences[sequenceId];
    const perf = await epitelete.writePerf(bookCode, sequenceId, sequence);
    _onReplace(perf)
    return buildResults(report,sourceKey)
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
    const { bookCode, chapter, verses } = result.metadata
    return `${bookCode} ${chapter}:${verses}`
  };

  const setReference = ({ result }) => {
    const { sourceKey, metadata } = result;
    const { bookCode, chapter, verses } = metadata;
    //TODO: include a callback for resetting card's reference
    console.log('Data for reference set:',{ bookCode, chapter, verses, sourceKey });
  }

  const setGroupCaption = ({key:sourceKey}) => {
    const [server, id, bookCode] = sourceKey.split('/');;
    return `(${sourceKey})`;
  };

  const setGroupTitle = ({ key: sourceKey }) => {
    const [server, id, bookCode] = sourceKey.split("/");
    return `Results`;
  };

  const fnrProps = {
    setGroups,
    onChangeTarget,
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
    }
  };

  return (
    <Collapse in={open}>
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