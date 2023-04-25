import React from 'react'
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { LocalPkCacheContext } from '../context/LocalPkCacheContext';
import PrintPopupDialogResources from '../lib/PrintPopupDialogResources'
import ColumnsSelector from './ColumnsSelector'
import PageSizeSelector from './PageSizeSelector'

const PrintPopupDialogStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '95%',
}

export default function PrintPopupDialog(props) {
  const {
    repoIdStr, langIdStr, bookId, verbose, extInfo, renderFlags,
  } = props;

  const [docIdFromCache, setDocIdFromCache] = useState(undefined)

  const {
    state: { pk, pkCache },
    actions: { getRepoUID }
  } = useContext(LocalPkCacheContext);

  const [includedNames, setIncludedNames] = useState(allNames)

  const [formatData, setFormatData] = useState({
    pageFormat: 'A4P',
    nColumns: 1,
  })

  useEffect(() => {
    if (pk != null) {
      const repoLangStr = getRepoUID(repoIdStr,langIdStr)
      if (pkCache[repoLangStr] && !docIdFromCache) {
        setDocIdFromCache(pkCache[repoLangStr])
      }
    }
  },[pk, pkCache, docIdFromCache, getRepoUID, repoIdStr, langIdStr, bookId]);


  const getStyles = (name) => {
    return {
      fontWeight: includedNames.indexOf(name) === -1 ? 'normal' : 'bold',
    }
  }

  const substituteCss = (template, replaces) => {
    let ret = template
    for (const [placeholder, replacement] of replaces) {
      ret = ret.replace(placeholder, replacement)
    }
    return ret
  }

  const handleIncludedChange = (event) => {
    const {
      target: { value },
    } = event
    setIncludedNames(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const pageCss = substituteCss(PrintPopupDialogResources.pageCssTemplate, [
    [
      '%pageWidth%',
      PrintPopupDialogResources.pageSizes[formatData.pageFormat].width,
    ],
    [
      '%pageHeight%',
      PrintPopupDialogResources.pageSizes[formatData.pageFormat].height,
    ],
    ['%nColumns%', formatData.nColumns],
  ])

  const makeIncludedFlags = (allN, includedN) => {
    const ret = {}
    for (const name of allN) {
      ret[`show${name.substring(0, 1).toUpperCase()}${name.substring(1)}`] =
        includedN.includes(name)
    }
    return ret
  }

  const onPrintClick = () => {
    const paras = PrintPopupDialogResources.doRender({
      pk,
      scriptureData: makeIncludedFlags(allNames, includedNames),
      docId,
    })
    const newPage = window.open()
    newPage.document.body.innerHTML = `<div id="paras">${paras}</div>`
    newPage.document.head.innerHTML = '<title>Diegesis PDF Preview</title>'
    const script = document.createElement('script')
    script.src = `${window.location.protocol}//${window.location.host}/static/pagedjs_0_4_0.js`
    newPage.document.head.appendChild(script)
    const style = document.createElement('style')
    style.innerHTML = pageCss
    newPage.document.head.appendChild(style)
  }

  const columnsList = [1, 2, 3]

  return (
    <>
      <Box sx={PrintPopupDialogStyle}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          'PREVIEW_DOCUMENT'
        </Typography>
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item sx={{ margin: '2%' }}>
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
                'INCLUDED_CONTENT'
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
          </Grid>
          <Grid item sx={{ margin: '2%' }}>
            <PageSizeSelector
              formLabelTitle={'PAGE_SIZE'}
              listItems={PrintPopupDialogResources.pageSizes}
              formatData={formatData}
              setFormatData={setFormatData}
            />
          </Grid>
          <Grid item sx={{ margin: '2%' }}>
            <ColumnsSelector
              formLabelTitle={'COLUMNS'}
              listItems={columnsList}
              formatData={formatData}
              setFormatData={setFormatData}
            />
          </Grid>
        </Grid>
        <Button onClick={onPrintClick} sx={{ float: 'left' }}>
          <PrintIcon color="primary" sx={{ fontSize: 50 }} />
        </Button>
      </Box>
    </>
  )
}


PrintPopupDialog.propTypes = {
  /** repoIdStr identifies a set of documents in proskomma, usually contains org and language code */
  repoIdStr: PropTypes.string,
  /** langIdStr identifies the language of a set of documents in proskomma */
  langIdStr: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Rendering flags */
  renderFlags: PropTypes.objectOf(PropTypes.bool),
  /** Extended info - to be displayed for some verses */
  extInfo: PropTypes.any,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
};

PrintPopupDialog.defaultProps = {
  verbose: false,
};
