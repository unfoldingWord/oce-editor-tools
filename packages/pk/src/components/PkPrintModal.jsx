import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  Fade,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import PrintIcon from '@mui/icons-material/Print'
import PropTypes from 'prop-types'
import { useBookPreviewRenderer, printModalResources } from "@oce-editor-tools/core"
import { LocalPkCacheContext } from '../context/LocalPkCacheContext';
import ColumnsSelector from './ColumnsSelector'
import PageSizeSelector from './PageSizeSelector'

const PkPrintModalStyle = {
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
];


export default function PkPrintModal({
  openPrintModal,
  handleClosePrintModal,
  repoIdStr, 
  langIdStr, 
  bookId, 
  verbose, 
  extInfo, 
  renderFlags: _renderFlags,
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
  ];

  const [docIdFromCache, setDocIdFromCache] = useState(undefined)
  const [includedNames, setIncludedNames] = useState(defaultIncludeNames);
  const [formatData, setFormatData] = useState({
    pageFormat: 'A4P',
    nColumns: 1,
  });

  const {
    state: { pk, pkCache },
    actions: { getRepoUID }
  } = useContext(LocalPkCacheContext);

  const makeIncludedFlags = (allN, includedN) => {
    const ret = {};
    for (const name of allN) {
      ret[`show${name.substring(0, 1).toUpperCase()}${name.substring(1)}`] =
        includedN.includes(name);
    }
    return ret;
  };

  const { ready, doRender } = useBookPreviewRenderer({
    pk, 
    docId: docIdFromCache, 
    bookId,
    renderFlags: makeIncludedFlags(allNames, includedNames),
    extInfo, 
    verbose,
    htmlRender: true,
  })

  useEffect(() => {
    if (pk != null) {
      if (!ready) {
        try {
          const repoLangStr = getRepoUID(repoIdStr,langIdStr)
          if (pkCache[repoLangStr] && !docIdFromCache) {
            setDocIdFromCache(pkCache[repoLangStr])
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  },[pk, pkCache, docIdFromCache, repoIdStr, langIdStr, ready, getRepoUID]);

  const getStyles = (name) => {
    return {
      fontWeight: includedNames.indexOf(name) === -1 ? 'normal' : 'bold',
    };
  };

  const substituteCss = (template, replaces) => {
    let ret = template;
    for (const [placeholder, replacement] of replaces) {
      ret = ret.replace(placeholder, replacement);
    }
    return ret;
  };

  const handleIncludedChange = (event) => {
    const {
      target: { value },
    } = event;
    setIncludedNames(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const pageCss = substituteCss(printModalResources.pageCssTemplate, [
    ['%pageWidth%', printModalResources.pageSizes[formatData.pageFormat].width],
    [
      '%pageHeight%',
      printModalResources.pageSizes[formatData.pageFormat].height,
    ],
    ['%nColumns%', formatData.nColumns],
  ]);

  const onPrintClick = () => {
    const renderedData = doRender({_renderFlags, extInfo, verbose, htmlRender: true})
    const newPage = window.open();
    newPage.document.body.innerHTML = `<div id="paras">${renderedData}</div>`;
    newPage.document.head.innerHTML = '<title>PDF Preview</title>';
    const script = document.createElement('script');
    script.src = `${window.location.protocol}//${window.location.host}/static/pagedjs_0_4_0.js`;
    newPage.document.head.appendChild(script);
    const style = document.createElement('style');
    style.innerHTML = pageCss;
    newPage.document.head.appendChild(style);
  };

  const columnsList = [1, 2, 3];

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPrintModal}
        onClose={handleClosePrintModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openPrintModal}>
          <Box sx={PkPrintModalStyle}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              PREVIEW_DOCUMENT
            </Typography>
            <Grid
              container
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
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
                    INCLUDED_CONTENT
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
                  listItems={printModalResources.pageSizes}
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
            <Button
              onClick={onPrintClick}
              sx={{ float: 'right' }}
            >
              <PrintIcon color="primary" sx={{ fontSize: 50 }} />
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

PkPrintModal.propTypes = {
  /** PkPrintModal is open when this is set true */
  openPrintModal: PropTypes.bool,
  /** handle the needed actions, when modal is closed */
  handleClosePrintModal: PropTypes.func,
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

PkPrintModal.defaultProps = {
  verbose: false,
};
