import React from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareMemo } from 'use-deep-compare';
import { AccordionDetails } from '@mui/material';

export default function SectionBody(sectionBodyProps) {
  const { children, show, ...props } = sectionBodyProps;

  const component = useDeepCompareMemo(() => {
    let _component = <></>;
    if (show) {
      _component = (
        <AccordionDetails className="sectionBody" {...props}>
          {children}
        </AccordionDetails>
      );
    };
    return _component;
  }, [show, props, children]);

  return component;
};
SectionBody.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
}
