import React from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareMemo } from 'use-deep-compare';
import { AccordionDetails } from '@mui/material';
import { Highlighted } from '../findr/highlights/components/Highlighted';

export default function SectionBody({
  children,
  target,
  options,
  show,
  ...props
}) {
  const component = useDeepCompareMemo(() => {
    let _component = <></>;
    if (show) {
      _component = (
        <AccordionDetails className="sectionBody" {...props}>
          {children}
        </AccordionDetails>
      );
    }
    return _component;
  }, [show, props, children]);

  return (
    <Highlighted target={target} options={options}>
      {component}
    </Highlighted>
  );
}

SectionBody.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
};
