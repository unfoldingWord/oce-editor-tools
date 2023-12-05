import React from 'react'
import PropTypes from 'prop-types'
import { 
  FormControl, 
  FormLabel,
  RadioGroup,
  Radio,
 } from '@mui/material'

export default function PageOrientationSelector({
  formLabelTitle,
  setPageOrientation,
}) {
  return (
    <>
      <FormControl
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}
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
          <Radio value="P" label="Portrait" />
          <Radio
            value="L"
            label="Landscape"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

PageOrientationSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  setPageOrientation: PropTypes.func,
};
