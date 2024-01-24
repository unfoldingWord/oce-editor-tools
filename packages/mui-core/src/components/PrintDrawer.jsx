import React, { useState } from 'react'
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Drawer,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import PropTypes from 'prop-types'
import printResources from '../lib/printResources'
import ColumnsSelector from './ColumnsSelector'
import PageSizeSelector from './PageSizeSelector'
import PageOrientationSelector from './PageOrientationSelector'

const defaultIncludeNames = [
  'titles',
  'headings',
  'introductions',
  'footnotes',
  'xrefs',
  'paraStyles',
  'characterMarkup',
  'chapterLabels',
  'versesLabels',
]

export default function PrintDrawer({
  openPrintDrawer,
  onClosePrintDrawer,
  onRenderContent,
  canChangeAtts,
  canChangeColumns,
  printFont,
  printFontSize,
  printLineHeight,
}) {

  const allNames = [
    'wordAtts',
    'titles',
    'headings',
    'introductions',
    'footnotes',
    'xrefs',
    'paraStyles',
    'characterMarkup',
    'chapterLabels',
    'versesLabels',
  ]

  const defaultPageSize = 'A4'

  const [includedNames, setIncludedNames] = useState(defaultIncludeNames)
  const [pageOrientation,setPageOrientation] = useState('P')
  const [formatData, setFormatData] = useState({
    pageFormatP: defaultPageSize,
    pageFormatL: defaultPageSize,
    nColumns: 1,
  })

  const getStyles = (name) => {
    return {
      fontWeight: includedNames?.indexOf(name) === -1 ? 'normal' : 'bold',
    }
  }

  const substituteCss = (template, replaces) => {
    let ret = template
    for (const [placeholder, replacement] of replaces) {
      ret = ret.replace(placeholder, replacement)
    }
    return ret
  }

  const handleIncludedChange = (event, value) => {
    if (event) {
      setIncludedNames(
        // We get a stringified value here.
        typeof value === 'string' ? value.split(',') : value
      )  
    }
  }

  const pageCss = substituteCss(printResources.pageCssTemplate, [
    ['%pageWidth%', 
      pageOrientation !== "L" 
      ? printResources.pageSizesP[formatData?.pageFormatP || defaultPageSize].width
      : printResources.pageSizesL[formatData?.pageFormatL || defaultPageSize].width,
    ],
    ['%pageHeight%',
      pageOrientation !== "L" 
        ? printResources.pageSizesP[formatData?.pageFormatP || defaultPageSize].height
        : printResources.pageSizesL[formatData?.pageFormatL || defaultPageSize].height,
    ],
    ['%nColumns%', formatData.nColumns],
  ])

  const onPrintClick = () => {
    const renderedData = onRenderContent && onRenderContent()
    const newPage = window.open()
    newPage.document.body.innerHTML = `<div id="paras" style="
    font-family: ${printFont}; font-size: ${printFontSize}; line-height: ${printLineHeight};">${renderedData}</div>`
    // ToDo: LG - Find another way of triggering the print action
    // This onLoad triggers too early in Chrome and doesn't work in Firefox
    // newPage.document.body.setAttribute('onLoad',"window.print()");
    newPage.document.head.innerHTML = '<title>PDF Preview</title>'
    const script = document.createElement('script')
    script.src = `https://unpkg.com/pagedjs/dist/paged.polyfill.js`
    newPage.document.head.appendChild(script)
    const style = document.createElement('style')
    style.innerHTML = pageCss
    newPage.document.head.appendChild(style)
  }

  const columnsList = [1, 2, 3]

  return (
    <>
      <Drawer
        anchor="right"
        variant="temporary"
        open={openPrintDrawer}
        onClose={onClosePrintDrawer}
      >
        <Box>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Page Format
          </Typography>
          <Grid
            container
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {canChangeAtts && (<Grid item sx={{ margin: '4%' }}>
              <FormGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}
              >
                <InputLabel
                  id="included-content-group-label"
                  sx={{ marginRight: '5%', marginTop: '2%' }}
                >
                  Included Content
                </InputLabel>
                <Select
                  labelId="included-content-group-label"
                  id="included-content"
                  multiple
                  value={includedNames}
                  onChange={handleIncludedChange}
                  input={<OutlinedInput label="Name" />}
                  sx={{ width: 450 }}
                >
                  {allNames.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            </Grid>)}
            <Grid item sx={{ margin: '4%' }}>
              <PageOrientationSelector
                formLabelTitle={'Page Orientation'}
                setPageOrientation={setPageOrientation}
              />
            </Grid>
            <Grid item sx={{ margin: '4%' }}>
              <PageSizeSelector
                formLabelTitle={'Page Size'}
                listItemsP={printResources.pageSizesP}
                listItemsL={printResources.pageSizesL}
                pageOrientation={pageOrientation}
                setFormatData={setFormatData}
              />
            </Grid>
            {canChangeColumns && (<Grid item sx={{ margin: '4%' }}>
              <ColumnsSelector
                formLabelTitle={'Columns'}
                listItems={columnsList}
                setFormatData={setFormatData}
              />
            </Grid>)}
          </Grid>
          <Button
            sx={{ margin: '4%' }}
            onClick={onPrintClick}
          >
            <PrintIcon color="primary" sx={{ fontSize: 50 }} />
          </Button>
        </Box>
      </Drawer>
    </>
  )
}

PrintDrawer.propTypes = {
  /** PrintDrawer is open when this is set true */
  openPrintDrawer: PropTypes.bool,
  /** handle the needed actions, when modal is closed */
  onClosePrintDrawer: PropTypes.func,
  /** needs to return the content that needs to be rendered */
  onRenderContent: PropTypes.func,
  canChangeAtts: PropTypes.bool,
  canChangeColumns: PropTypes.bool,
  /** Print font */
  printFont: PropTypes.string,
  /** Print font size */
  printFontSize: PropTypes.string,
  /** Print line height */
  printLineHeight: PropTypes.string,
}

PrintDrawer.defaultProps = {
  canChangeAtts: false,
  canChangeColumns: false
}
