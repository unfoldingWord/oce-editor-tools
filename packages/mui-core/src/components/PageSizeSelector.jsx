import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormLabel, MenuItem, Select } from '@mui/material'

export default function PageSizeSelector(pageSizeSelectorProps) {
  const {
    formLabelTitle,
    listItemsP,
    listItemsL,
    pageOrientation,
    setFormatData,
  } = pageSizeSelectorProps;
  
  const setFormatValue = (field, value) => {
    if (field) setFormatData((prev) => ({ ...prev, [field]: value})) 
  }
  return (
    <>
      <FormGroup
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}
      >
        <FormLabel
          id="page-size-group-label"
          sx={{ marginRight: '5%', marginTop: '1%' }}
        >
          {formLabelTitle}
        </FormLabel>
        {(pageOrientation === 'P') && (<Select
          aria-labelledby="page-size-group-label"
          name="page-size-buttons-group"
          defaultValue="A4"
          size="small"
          color="primary"
          sx={{ marginRight: '1em', width: '150px' }}
          onChange={(e) => setFormatValue('pageFormatP', e?.target?.value)}
        >
          {Object.entries(listItemsP).map((pf, n) => (
            <MenuItem
              key={n}
              value={pf[0]}
            >
              {pf[1].label}
            </MenuItem>
          ))}
        </Select>)}
        {(pageOrientation === 'L') && (<Select
          aria-labelledby="page-size-group-label"
          name="page-size-buttons-group"
          defaultValue="A4"
          size="small"
          color="primary"
          sx={{ marginRight: '1em', width: '150px' }}
          onChange={(e) => setFormatValue('pageFormatP', e?.target?.value)}
        >
          {Object.entries(listItemsL).map((pf, n) => (
            <MenuItem
              key={n}
              value={pf[0]}
            >
              {pf[1].label}
            </MenuItem>
          ))}
        </Select>)}
      </FormGroup>
    </>
  );
}

PageSizeSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  pageOrientation: PropTypes.string,
  listItemsP: PropTypes.any,
  listItemsL: PropTypes.any,
  setFormatData: PropTypes.func,
};
