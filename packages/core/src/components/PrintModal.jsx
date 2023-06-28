import React, { useState } from 'react'
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
import printModalResources from '../lib/printModalResources'
import ColumnsSelector from './ColumnsSelector'
import PageSizeSelector from './PageSizeSelector'

const PrintModalStyle = {
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


export default function PrintModal({
  openPrintModal,
  handleClosePrintModal,
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
  ];

  const [includedNames, setIncludedNames] = useState(defaultIncludeNames);
  const [formatData, setFormatData] = useState({
    pageFormat: 'A4P',
    nColumns: 1,
  });

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
    const renderedData = onRenderContent && onRenderContent()
    const newPage = window.open();
    newPage.document.body.innerHTML = `<div id="paras">${renderedData}</div>`;
    newPage.document.head.innerHTML = '<title>PDF Preview</title>';
    const script = document.createElement('script');
    script.src = `https://unpkg.com/pagedjs/dist/paged.polyfill.js`;
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
          <Box sx={PrintModalStyle}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              PREVIEW_DOCUMENT
            </Typography>
            <Grid
              container
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {canChangeAtts && (<Grid item sx={{ margin: '2%' }}>
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
              </Grid>)}
              <Grid item sx={{ margin: '2%' }}>
                <PageSizeSelector
                  formLabelTitle={'PAGE_SIZE'}
                  listItems={printModalResources.pageSizes}
                  formatData={formatData}
                  setFormatData={setFormatData}
                />
              </Grid>
              {canChangeColumns && (<Grid item sx={{ margin: '2%' }}>
                <ColumnsSelector
                  formLabelTitle={'COLUMNS'}
                  listItems={columnsList}
                  formatData={formatData}
                  setFormatData={setFormatData}
                />
              </Grid>)}
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

PrintModal.propTypes = {
  /** PrintModal is open when this is set true */
  openPrintModal: PropTypes.bool,
  /** handle the needed actions, when modal is closed */
  handleClosePrintModal: PropTypes.func,
  /** needs to return the content that needs to be rendered */
  onRenderContent: PropTypes.func,
  canChangeAtts: PropTypes.bool,
  canChangeColumns: PropTypes.bool
};

PrintModal.defaultProps = {
  canChangeAtts: false,
  canChangeColumns: false
};
