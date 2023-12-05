import React from 'react';
import PropTypes from 'prop-types'
import { Typography } from '@mui/joy'
import { Select, Option } from './basic/Select'

export default function ColumnsSelector({
  formLabelTitle,
  listItems,
  setFormatData,
}) {
  const setFormatValue = (field, value) => {
    if ((field) && (value)) setFormatData((prev) => ({ ...prev, [field]: value})) 
  }

  return (
    <>
      <form
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}
      >
        <Typography
          id="page-size-group-label"
          sx={{ marginRight: '5%', marginTop: '1%' }}
        >
          {formLabelTitle}
        </Typography>
        <Select
          aria-labelledby="page-size-group-label"
          name="page-size-buttons-group"
          defaultValue={listItems ? listItems[0] : "1"}
          size="small"
          sx={{ width: '70px' }}
          color="primary"
          onChange={(_e,newValue) => setFormatValue('nColumns', newValue)}
        >
          {listItems.map((nc, n) => (
            <Option
              key={n}
              value={nc}
            >
              {`${nc}`}
            </Option>
          ))}
        </Select>
      </form>
    </>
  );
}

ColumnsSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  listItems: PropTypes.any,
  setFormatData: PropTypes.func,
};

