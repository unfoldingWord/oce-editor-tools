import React from 'react'
import PropTypes from 'prop-types'
import { 
  FormControl, 
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
 } from '@mui/material'

export default function PageOrientationSelector(pageOrientationSelectorProps) {
  const {
    formLabelTitle,
    setPageOrientation,
  } = pageOrientationSelectorProps;
  
  return (
    <>
      <FormControl
        sx={{ width: '100%' }}
      >
        <FormLabel
          id="page-size-group-label"
          sx={{ marginRight: '5%', marginTop: '1%' }}
        >
          {formLabelTitle}
        </FormLabel>
        <RadioGroup 
          defaultValue="P"
          variant="oulined"
          name="radio-buttons-group-focus"
          onChange={(e) => setPageOrientation(e?.target?.value)}
        >
          <FormControlLabel value="P" control={<Radio />} label="Portrait" />
          <FormControlLabel value="L" control={<Radio />} label="Landscape" />
        </RadioGroup>
      </FormControl>
    </>
);
}

PageOrientationSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  setPageOrientation: PropTypes.func,
};
