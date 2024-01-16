import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Option, Select } from '@mui/joy'

export default function PageSizeSelector({
  formLabelTitle,
  listItemsP,
  listItemsL,
  pageOrientation,
  setFormatData,
}) {
  const setFormatValue = (field, value) => {
    if (field) setFormatData((prev) => ({ ...prev, [field]: value})) 
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
            <Option
              key={n}
              value={pf[0]}
            >
              {pf[1].label}
            </Option>
          ))}
        </Select>)}
        {(pageOrientation === 'L') && (<Select
          aria-labelledby="page-size-group-label"
          name="page-size-buttons-group"
          defaultValue="A4"
          size="small"
          color="primary"
          sx={{ marginRight: '1em', width: '150px' }}
          onChange={(e) => setFormatValue('pageFormatL', e?.target?.value)}
        >
          {Object.entries(listItemsL).map((pf, n) => (
            <Option
              key={n}
              value={pf[0]}
            >
              {pf[1].label}
            </Option>
          ))}
        </Select>)}
      </form>
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
