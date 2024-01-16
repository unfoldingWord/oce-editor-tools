import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'

export default function PageOrientationSelector({
  formLabelTitle,
  setPageOrientation,
}) {
  return (
    <>
      <form
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}
      >
        <FormControl>
          <FormLabel>{formLabelTitle}</FormLabel>
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
      </form>
    </>
  );
}

PageOrientationSelector.propTypes = {
  formLabelTitle: PropTypes.string,
  setPageOrientation: PropTypes.func,
};
