import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from '@mui/material';

export default function Section(sectionProps) {
  const { children, show, dir, ...props } = sectionProps;

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true, timeout: 0 }}
      expanded={show}
      className={"section " + dir}
      dir={dir}
      {...props}
      sx={{ background: "none",...props.sx}}
    >
      {children}
    </Accordion>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  dir: PropTypes.string,
}
