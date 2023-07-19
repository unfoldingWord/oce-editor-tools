import { useCallback, useMemo } from "react";
import { useEditorContext } from "./Editor";
import Toggle from "./Toggle/Toggle";
import BlockHeadless from "./BlockHeadless";

export function Toolbar({ children, component,...props }) {
  const {
    state: { options },
    actions: { setOptions },
  } = useEditorContext();

  const optionsArray = useMemo(
    () =>
      Object.keys(options).reduce((optionsArray, optionKey) => {
        if (!!options[optionKey]) optionsArray.push(optionKey);
        return optionsArray;
      }, []),
    [options]
  );

  const handleToggles = useCallback(
    (newOptions) => {
      setOptions(newOptions)
    },
    [setOptions]
  );

  const renderProps = {
    options: optionsArray,
    setOptions,
    ...props,
  };
  return (
    <Toggle.Group values={optionsArray} onChange={handleToggles}>
      <BlockHeadless component={component} {...renderProps}>
        {children}
      </BlockHeadless>
    </Toggle.Group>
  );
}

export default Toolbar;
  // const buttonsProps = {
  //   onRenderToolbar,
  //   showToggles: false,

  //   // onSearch: handleSearch,
  //   // content: (
  //   //   <FindReplace
  //   //     onReplace={updateHtml}
  //   //     epitelete={epiteleteHtml}
  //   //     bookCode={bookCode}
  //   //     onChangeOptions={(options) => setHighlighterOptions(options)}
  //   //     onChangeTargets={(target) => setHighlighterTarget(target)}
  //   //     open={openSearch}
  //   //     setOpen={setOpenSearch}
  //   //     onClickResult={handleReferenceSelected}
  //   //   />
  //   // ),
  // };