import React from 'react'
import PropTypes from 'prop-types'
import { FormLabel, MenuItem, Select } from '@mui/joy'

export default function PageSizeSelector({
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
      <form
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
          defaultValue="A4P"
          size="small"
          color="primary"
          sx={{ marginRight: '1em', backgroundColor: '#FFF' }}
          onChange={(e) => setFormatValue('pageFormat', e.target.value)}
        >
          {Object.entries(listItems).map((pf, n) => (
            <MenuItem
              key={n}
              value={pf[0]}
            >
              {pf[1].label}
            </MenuItem>
          ))}
        </Select>
      </form>
    </>
  );
}

PageSizeSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  listItems: PropTypes.any,
  formatData: PropTypes.any,
  setFormatData: PropTypes.func,
};
