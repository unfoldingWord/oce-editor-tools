import React, { useEffect } from 'react';
import {
  Autocomplete,
  createFilterOptions,
  Popper,
  TextField,
} from "@mui/material";
import { findItemDefault, findKeyInList } from "../../common/ReferenceUtils";
import PropTypes from "prop-types";
import isequal from "lodash.isequal";
import { ArrowDropDown } from "@mui/icons-material";

const autoCompleteDefaultStyle = {
  height: "12px",
  width: "120px",
  fontFamily: "Noto Sans",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0",
  lineHeight: "12px",
  textAlign: "center",
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "0px",
  marginTop:"-6px"
}

const defaultPopperWidthMultiplier = 1.25; // accommodates width of vertical scrollbar so text is not cropped

function defaultStringify(value) {
  if (value == null) {
    return '';
  }

  if (typeof value === 'object') { // find matches either in key or name
    return value.key + value.name;
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

function compareOption(option, value) {
  const equal = option.key === value.key;
  // if (equal) {
  //   console.log('found exact match', option, value);
  // }
  return equal;
}

function initFilterOptions(matchName) {
  const matchType = matchName ? defaultStringify : (item) => (item.key);

  return createFilterOptions({
    stringify: matchType,
    ignoreCase: true,
  });
}

function applyStylesToInput(params, styles) {
  if (params) {
    if (!params.inputProps) {
      params.inputProps = {}
    }
    let newStyles = styles;
    if (params.inputProps.style) {
      newStyles = { ...params.inputProps.style, ...styles};
    }
    params.inputProps.style = newStyles;
  }
  return params;
}

export function ReferenceSelector(props) {
  const {
    id,
    style,
    options,
    initial,
    onChange,
    matchName,
    inputProps,
    usePopperWidth,
    matcher,
  } = props;

  const initialSelectionKey = initial || ( options.length && options[0].key ) || '';
  const initialSelectedValue = findItemDefault(options, initialSelectionKey);
  const [selectedValue, setSelectedValue] = React.useState(initialSelectedValue);
  const [textboxValue, setTextboxValue] = React.useState(initialSelectedValue.key);
  const [selectionOptions, setSelectionOptions] = React.useState(options);

  const filterOptions = initFilterOptions(matchName);
  const style_ = { ...autoCompleteDefaultStyle, ...style}; // style property will override default style

  useEffect(() => {
    if (!isequal(options, selectionOptions)) {
      // console.log(`ReferenceSelector.useEffect(${id}) - options changed`);
      setSelectionOptions(options);
    }
    if ((initialSelectionKey !== textboxValue) || (initialSelectionKey !== selectedValue.key)) {
      // console.log(`ReferenceSelector.useEffect(${id}) - initial changed to ${initial}`);
      setSelectedValue(initialSelectedValue);
      setTextboxValue(initialSelectedValue.key);
    }
  }, [initial, options]);

  function PopperMy(props) {
    const popperProps = {...props};
    popperProps['placement'] = 'bottom-start';
    const width = popperProps.style?.width; // get current width (from parent)
    if (usePopperWidth ) { // use popper width setting passed as property
      popperProps.style.width = usePopperWidth ;
    } else if (typeof width === 'number') {
      // add width for vertical scrollbar, since some browsers will truncate width to accommodate scrollbar when it is shown
      popperProps.style.width = Math.round(width * defaultPopperWidthMultiplier) + 'px';
    }
    return (<Popper {...popperProps} />)
  }

  /**
   * send text to external matcher to see if it matchers additional patterns
   * @param text - string to search for a match
   * @return {object|null}  returns object if matcher matched the text
   */
  function tryMatcher(text) {
    if (matcher) {
      const matched = matcher(text)
      if (matched) { // if external matcher found a match
        const id = matched.id
        const newValue = matched[id]; // get the value for our id
        if (newValue) {
          const newSelectedValue = findItemDefault(selectionOptions, newValue);
          // update with extracted value
          setSelectedValue(newSelectedValue)
          setTextboxValue(newValue)
        }
        return matched
      }
    }
    return null
  }

  const changeSelectedValue = (oldValue, newValue) => {
    const oldKey = oldValue.key
    const newKey = newValue.key
    if (onChange) {
      onChange(newKey, oldKey).then(okToChange => {
        // console.log(`ReferenceSelector(${id}).onChange() - changed approved: ${okToChange}`);
        if (okToChange) {
          setSelectedValue(newValue);
          setTextboxValue(newKey);
        } else { // change rejected, restore previous selection
          // console.log(`ReferenceSelector(${id}).onChange() - restoring previous setting`, oldKey);
          setSelectedValue(selectedValue);
          setTextboxValue(oldKey);
        }
      })
    } else {
      setSelectedValue(newValue);
      setTextboxValue(newKey);
    }
  }

  /**
   * Select the highlighted value on tab press
   * @param {object} event event containing key press information
   */
  const handleKeyDown = event => {
    if (event.key === 'Tab' && event.target.tagName === 'INPUT') {
      const newKey = event.target.value
      const newValue = options.find(option => option.key === newKey)
      if (newValue) {
        changeSelectedValue(selectedValue, newValue)
      }
    }
  }

  // Render the UI for your table
  return (
    <Autocomplete
      id={`combo-box-${id}`}
      // autoComplete={true}
      // blurOnSelect={true}
      autoComplete
      autoHighlight
      clearOnBlur
      disableClearable={true}
      disableListWrap
      // disableCloseOnSelect={false}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.key}
      isOptionEqualToValue={compareOption}
      handleHomeEndKeys
      onBlur={() => { // send latest selection to onChange
        let latestValue = null;
        if (textboxValue !== selectedValue.key) { // see if change in textbox contents
          let found = findKeyInList(options, 'key', textboxValue);
          if (found < 0) {
            found = findKeyInList(options, 'name', textboxValue);
          }

          if (found >= 0) { // if this matches an option, then use it
            const selectedValue = options[found];
            setSelectedValue(selectedValue);
            latestValue = selectedValue.key;
            setTextboxValue(latestValue);
            // console.log(`ReferenceSelector(${id}).onBlur() - setting to last matched value ${latestValue}`);
          }

          if(tryMatcher(textboxValue)) {
            return
          }
        }

        if (!latestValue) { // if different match not found in textbox, use last selected
          latestValue = selectedValue.key;
          // console.log(`ReferenceSelector(${id}).onBlur() - setting to last selected value ${latestValue}`);
        }

        if(tryMatcher(textboxValue)) {
          return
        }

        if (latestValue !== initial) {
          onChange && onChange(latestValue);
        }
      }}
      options={selectionOptions}
      selectOnFocus
      style={style_}

      value={selectedValue}
      onChange={(event, newValue) => { // when selected from menu
        if (newValue) {
          changeSelectedValue(selectedValue, newValue)
        } else {
          console.error(`ReferenceSelector(${id}).onChange() - invalid setting ${newValue}`);
        }
      }}

      inputValue={textboxValue}
      onInputChange={(event, newInputValue) => { // on typing in text box
        if(tryMatcher(newInputValue)) {
          return
        }

        setTextboxValue(newInputValue);
        // console.log(`ReferenceSelector(${id}).onInputChange() - new input value ${newInputValue}`);
      }}

      renderInput={(params) => {
        return (
          <TextField
            {...applyStylesToInput(params, style)}
            InputProps={{ ...params.InputProps, ...inputProps }}
            onKeyDown={handleKeyDown}
          />
        )
      }}
      popupIcon={<ArrowDropDown id={`combo-box-arrow-${id}`} style={{ color: style.color || '#000', marginTop:'-10px' }} />}
      PopperComponent={PopperMy}
    />
  )
}

ReferenceSelector.defaultProps = {
  matchName: false,
  inputProps: {},
  style: {},
};

/**
 * selection option used by ReferenceSelector components
 * @typedef {Object} SelectionOption
 * @property {string} key - internal key (identifier) for selection
 * @property {string} name - internal name used for matching typed text (e.g. `Mark`)
 * @property {string} value - string to be displayed for selection (e.g. `Mark (mrk)`)
 */

ReferenceSelector.propTypes = {
  /** SelectionOption[] - array of current selectable options */
  options: PropTypes.array.isRequired,
  /** selection item (by key) to preselect */
  initial: PropTypes.string.isRequired,
  /** function(key: string) - async call back for when selected item changed */
  onChange: PropTypes.func.isRequired,
  /** if true the text input will be matched against either key or name, otherwise will match key only */
  matchName: PropTypes.bool,
  /** identifier for this ReferenceSelector instance */
  id: PropTypes.string.isRequired,
  /** custom styles to use, defaults to {} */
  style: PropTypes.object,
  /** used to set width of Popper **/
  usePopperWidth: PropTypes.string,
  /** TextField props */
  inputProps: PropTypes.object,
  /** optional callback function for enhanced matching, returns true to block internal matching */
  matcher: PropTypes.func,
};

export default ReferenceSelector;
