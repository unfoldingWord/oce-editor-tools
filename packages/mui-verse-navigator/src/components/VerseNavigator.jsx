import * as React from 'react'
import PropTypes from 'prop-types'
import { Popper } from '@mui/base/Popper'
import FormControl from '@mui/material/FormControl'
import ListSubheader from '@mui/material/ListSubheader'
import MenuBook from '@mui/icons-material/MenuBook'
import TextField from '@mui/material/TextField'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled } from '@mui/material/styles'
import { VariableSizeList } from 'react-window'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import {
  engBibleBookName,
  bRefLastChapterInBook, 
  bRefLastVerseInChapter,
  versification_ESV,
  normalisedBookId
} from '@oce-editor-tools/verse-mapper'

const LISTBOX_PADDING = 6 // px

function renderRow(props) {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  }

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    )
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  )
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
})

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData = []
  children.forEach((item) => {
    itemData.push(item)
    itemData.push(...(item.children || []))
  })

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

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
  )
})

ListboxComponent.propTypes = {
  children: PropTypes.any,
}

export default function VerseNavigator({
  defaultBibleRef, 
  inputValue,
  onInputChange,
  bookId,
  chapter,
  verse,
  onChangeBook,
  onChangeChapter,
  onChangeVerse
}) {

  // eslint-disable-next-line no-unused-vars
  const [localBookId,setLocalBookId] = React.useState(bookId || defaultBibleRef?.bookId)
  const [localCh,setLocalCh] = React.useState(
    (typeof chapter === "string") ? parseInt(chapter) : chapter || defaultBibleRef?.chapter
  )
  const [localV,setLocalV] = React.useState(
    (typeof verse === "string") ? parseInt(verse) : verse || defaultBibleRef?.verse
  )

  const curValue = {
    label: `${localCh}:${localV}`, 
    chapter: localCh,
    value: localV
  }

  const localRef = {
    bookId: localBookId, 
    chapter: localCh, 
    verse: localV
  }

  const [localValue, setLocalValue] = React.useState(curValue)
  const [localInputValue, setLocalInputValue] = React.useState(curValue.label)

  const curEngBookname = localBookId && engBibleBookName[normalisedBookId(localBookId)]

  const curLastCh = bRefLastChapterInBook(localRef)
  const curLastV = bRefLastVerseInChapter(localRef)

  const [openDialog, setOpenDialog] = React.useState(false)

  const curChapterOptions = Array.from(Array(curLastCh), (x, i) => ({
    label: `${i+1}`, 
    groupLabel: `${curEngBookname}`,
    type: "Ch",
    value: i
  }))

  const curVerseOptions = Array.from(Array(curLastV), (x, i) => ({
    label: `${localCh}:${i+1}`, 
    groupLabel: `${curEngBookname} ${localCh}`, 
    chapter: localCh,
    type: "V",
    value: i
  }))
  console.log(curVerseOptions)

  const getMultilevelCVOptions = () => {
    let array2D = [], ch = curLastCh 
    for (let i = 0; i < ch; i++){
      if (i !== localCh-1) { // Skip the current chapter
        const getLastV = bRefLastVerseInChapter({...localRef, localCh: i +1})
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

  const handleChange = (event, newValue) => {
    let setNewValue = newValue
    let newV = newValue?.value+1
    let newCh = undefined
    if (newValue?.type !== "V") {
      if (newValue?.type === "Ch") {
        newCh = newValue?.value+1
        newV = 1
      } else if (newValue?.type === "CV") {
        newV = newValue?.value+1
        newCh = newValue?.chapter
      }
      setNewValue = {label: `${newCh}:${newV}`}
    }
    if (newCh && (localCh !== newCh)) {
      if (onChangeChapter) onChangeChapter(newCh)
    }
    if (newV && (localV !== newV)) {
      if (onChangeVerse) onChangeVerse(newV)
    }
    if (newCh) setLocalCh(newCh)
    setLocalV(newV)
    setLocalValue(setNewValue)
  }

  const handleInputChange = (event, newInputValue) => {
    if (onInputChange) onInputChange(event, newInputValue)
    setLocalInputValue(newInputValue)
  }

  const handleSelectClick = (event,val) => {
    const newBook = versification_ESV.osisOrderedBibleBooks[val]
    if (localV !== 1) {
      onChangeVerse && onChangeVerse(1)
    }
    if (localCh !== 1) {
      onChangeChapter && onChangeChapter(1)
    }
    onChangeBook && onChangeBook(newBook)
    setLocalValue({label: "1:1"})
    setLocalBookId(newBook)
    setLocalCh(1)
    setLocalV(1)
    setOpenDialog(false)
  }

  const handleSelectClose = (event) => setOpenDialog(false)

  const curOptions = [...curChapterOptions, ...curVerseOptions, ...getMultilevelCVOptions()]
  console.log(curOptions)

  const isEqualOption = (option, value) => (option.label === value.label)
  const onSelectBookClick = () => setOpenDialog(true)
  return (
    <div>
      <Dialog open={openDialog} onClose={handleSelectClose}>
        <DialogContent>
          <Typography
            variant="h5"
            component="div">
            Select Bibel book
          </Typography>
          <Grid container spacing={1}>
            {versification_ESV.osisOrderedBibleBooks.map((osisKey,inx) => (
              <Grid 
                sx={{
                  backgroundColor: '#333333',
                  textAlign: 'center',
                  color:  'lightgrey',
                  marginTop: '5px',
                  marginRight: '9px',
                  paddingTop: '3px',
                  paddingRight: '5px',
                }}
                item 
                key={inx}
                onClick={(ev) => handleSelectClick(ev,inx)}
              >
                {engBibleBookName[normalisedBookId(osisKey)]}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
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
            )
          }}
          // value={value|| localValue}
          value={localValue}
          onChange={handleChange}
          inputValue={inputValue || localInputValue}
          isOptionEqualToValue={isEqualOption}
          onInputChange={handleInputChange}
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
    </div>
  )
}
