import * as React from 'react'
import PropTypes from 'prop-types'
import { Popper } from '@mui/base/Popper'
import FormControl from '@mui/material/FormControl'
import ListSubheader from '@mui/material/ListSubheader'
import MenuBook from '@mui/icons-material/MenuBook'
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import {
  engBibleBookName,
  bRefLastChapterInBook, 
  bRefLastVerseInChapter,
  normalisedBookId
} from '@oce-editor-tools/verse-mapper'

const LISTBOX_PADDING = 6 // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.any,
};

export default function VerseNavigator({defaultBibleRef}) {
  const curDefaultValue = {
    label: `${defaultBibleRef.chapter}:${defaultBibleRef.verse}`, 
    chapter: defaultBibleRef.chapter,
    value: defaultBibleRef.verse
  }

  // eslint-disable-next-line no-unused-vars
  const [localRef,setLocalRef] = React.useState(defaultBibleRef)
  const [value, setValue] = React.useState(curDefaultValue)
  const [inputValue, setInputValue] = React.useState(curDefaultValue.label)
  const curEngBookname = engBibleBookName[normalisedBookId(localRef.bookId)]
  const curLastCh = bRefLastChapterInBook(localRef)
  const curLastV = bRefLastVerseInChapter(localRef)
  
  const curChapterOptions = Array.from(Array(curLastCh), (x, i) => ({
    label: `${i+1}`, 
    groupLabel: `${curEngBookname}`,
    type: "Ch",
    value: i
  }))

  const curVerseOptions = Array.from(Array(curLastV), (x, i) => ({
    label: `${localRef.chapter}:${i+1}`, 
    groupLabel: `${curEngBookname} ${localRef.chapter}`, 
    chapter: localRef.chapter,
    type: "V",
    value: i
  }))

  const getMultilevelCVOptions = () => {
    let array2D = [], ch = curLastCh 
    for (let i = 0; i < ch; i++){
      if (i !== localRef.chapter-1) { // Skip the current chapter
        const getLastV = bRefLastVerseInChapter({...localRef, chapter: i +1})
        const temp = Array.from(Array(getLastV), (x, j) => ({
          label: `${i+1}:${j+1}`, 
          groupLabel: `${curEngBookname} ${i+1}`, 
          chapter: i+1,
          type: "CV",
          value: j
        }))
        array2D.push(...temp)
      }
    }
    return array2D
  }
  
  const curOptions = [...curChapterOptions, ...curVerseOptions, ...getMultilevelCVOptions()]

  const isEquualOption = (option, value) => (option.label === value.label)
  const onSelectBookClick = () => console.log("onSelectBookClick")
  return (
    <FormControl id="virtualize-demo">
      <Autocomplete
        renderInput={params => {
          return (
            <TextField
              {...params}
              variant="standard"
              label={curEngBookname}
              placeholder="Chapter and verse"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                    <MenuBook
                      onClick={onSelectBookClick}
                    />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                )
              }}
            />
          );
        }}
        value={value}
        onChange={(_event, newValue) => {
          let setNewValue = newValue
          let newV = newValue?.value+1
          let newCh = undefined
          if (newValue?.type === "Ch") {
            newCh = newValue?.value+1
            setNewValue = {
              label: `${newValue.value+1}:1`, 
            }
          }
          setLocalRef(prev => ({
            bookId: prev.bookId,
            chapter: newCh || prev.chapter,
            verse: newV,
          }))
          setValue(setNewValue);
        }}
        inputValue={inputValue}
        isOptionEqualToValue={isEquualOption}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="virtualize-demo"
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        sx={{ width: 150 }}
        options={curOptions}
        groupBy={(option) => option.groupLabel}
        getOptionLabel={(option)=>option.label}
        renderOption={(props, option) => [props, option.label]}
        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
        renderGroup={(params) => params}
      />
    </FormControl>
  )
}
