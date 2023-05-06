import React from 'react';
import PropTypes from 'prop-types'
import { FormGroup, FormLabel, MenuItem, Select } from '@mui/material'

export default function ColumnsSelector({
  formLabelTitle,
  listItems,
  formatData,
  setFormatData,
}) {
  const setFormatValue = (field, value) => {
    const newData = { ...formatData };
    newData[field] = value;
    setFormatData(newData);
  };
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
        <Select
          aria-labelledby="page-size-group-label"
          name="page-size-buttons-group"
          defaultValue="1"
          size="small"
          color="primary"
          sx={{ marginRight: '1em', backgroundColor: '#FFF' }}
          onChange={(e) => setFormatValue('nColumns', e.target.value)}
        >
          {listItems.map((nc, n) => (
            <MenuItem
              key={n}
              value={nc}
            >
              {`${nc}`}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
    </>
  );
}

ColumnsSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  listItems: PropTypes.any,
  formatData: PropTypes.any,
  setFormatData: PropTypes.func,
};

