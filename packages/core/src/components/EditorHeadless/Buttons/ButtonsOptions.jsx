import { useCallback, useMemo } from 'react';
import Toggle from '../Toggle/Toggle'
import { useEditorContext } from '../Editor';
import { Edit, Preview, Subject, ViewStream } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';

export function ButtonsOptions({showToggles}) {
  const { state: {options}, actions: {setOptions} } = useEditorContext();

  const optionsArray = useMemo(
    () => Object.keys(options).reduce((optionsArray,optionKey) => {
      if (!!options[optionKey]) optionsArray.push(optionKey);
      return optionsArray;
    },[]),
    [options]
  );

  const handleToggles = useCallback(
    (newOptions) => setOptions(newOptions),
    [setOptions]
  );
  return (
    <Toggle.Group defaultValues={optionsArray} onChange={handleToggles}>
      {showToggles && (
        <Toggle.Button
          component={ToggleButton}
          value="sectionable"
          aria-label="sectionable"
          title="Sectionable"
        >
          <ViewStream />
        </Toggle.Button>
      )}
      {showToggles && (
        <Toggle.Button
          component={ToggleButton}
          value="blockable"
          aria-label="blockable"
          title="Blockable"
        >
          <Subject />
        </Toggle.Button>
      )}
      {showToggles && (
        <Toggle.Button
          component={ToggleButton}
          value="preview"
          aria-label="preview"
          title="Preview"
        >
          <Preview />
        </Toggle.Button>
      )}
      <Toggle.Button
        component={ToggleButton}
        value="editable"
        aria-label="editable"
        title="Editable"
      >
        <Edit />
      </Toggle.Button>
    </Toggle.Group>
  );
}