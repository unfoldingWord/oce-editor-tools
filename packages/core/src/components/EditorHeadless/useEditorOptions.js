import { useCallback, useMemo, useState } from 'react';

export function useEditorOptions(defaultOptions) {
  const initialOptions = useMemo(
    () => ({
      sectionable: true,
      blockable: true,
      editable: true,
      preview: true,
      locked: false,
      ...defaultOptions,
    }),
    [defaultOptions]
  );

  const baseOptions = useMemo(
    () =>
      Object.keys(initialOptions).reduce((baseOptions, option) => {
        baseOptions[option] = false;
        return baseOptions;
      }, {}),
    [initialOptions]
  );

  const [options, _setOptions] = useState(initialOptions);

  const setOptions = useCallback(
    (optionsArray = []) => {
      const selected = optionsArray.reduce(
        (selected, option) => {
          selected[option] = true;
          return selected;
        },
        { ...baseOptions }
      );
      _setOptions(selected);
    },
    [baseOptions]
  );

  const setOption = useCallback((optionName, value) => {
    _setOptions((options) => ({
      ...options,
      [optionName]: value,
    }));
  }, []);

  const toggleOption = useCallback((optionName) => {
    _setOptions((options) => ({
      ...options,
      [optionName]: !options[optionName],
    }));
  }, []);

  return {
    state: { options },
    actions: { setOptions, setOption, toggleOption },
  };
}

export default useEditorOptions;
