import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Option,
  Drawer,
  Input,
  Select,
  Typography,
} from '@mui/joy'
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
    newPage.document.body.innerHTML = `<div id="paras">${renderedData}</div>`
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
        open={openPrintDrawer}
        onClose={onClosePrintDrawer}
      >
        <Box>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Page Format
          </Typography>
          <Grid
            container
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {canChangeAtts && (<Grid sx={{ margin: '4%' }}>
              <form
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  id="included-content-group-label"
                  sx={{ marginRight: '5%', marginTop: '2%' }}
                >
                  Included Content
                </Typography>
                <Select
                  id="included-content"
                  multiple
                  value={includedNames}
                  onChange={handleIncludedChange}
                  input={<Input label="Name" variant="outlined"/>}
                  sx={{ width: 450 }}
                >
                  {allNames.map((name) => (
                    <Option key={name} value={name} style={getStyles(name)}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </form>
            </Grid>)}
            <Grid sx={{ margin: '4%' }}>
              <PageOrientationSelector
                formLabelTitle={'Page Orientation'}
                setPageOrientation={setPageOrientation}
              />
            </Grid>
            <Grid sx={{ margin: '4%' }}>
              <PageSizeSelector
                formLabelTitle={'Page Size'}
                listItemsP={printResources.pageSizesP}
                listItemsL={printResources.pageSizesL}
                pageOrientation={pageOrientation}
                setFormatData={setFormatData}
              />
            </Grid>
            {canChangeColumns && (<Grid sx={{ margin: '4%' }}>
              <ColumnsSelector
                formLabelTitle={'Columns'}
                listItems={columnsList}
                formatData={formatData}
                setFormatData={setFormatData}
              />
            </Grid>)}
          </Grid>
          <Button
            color="primary"
            sx={{ margin: '4%' }}
            onClick={onPrintClick}
          >
            <PrintIcon sx={{ fontSize: 40 }} />
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
  canChangeColumns: PropTypes.bool
}

PrintDrawer.defaultProps = {
  canChangeAtts: false,
  canChangeColumns: false
}
