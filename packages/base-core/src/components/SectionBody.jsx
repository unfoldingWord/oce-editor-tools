import React from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareMemo } from 'use-deep-compare';
import { AccordionDetails } from '@mui/joy';

export default function SectionBody({ children, show, ...props }) {

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
