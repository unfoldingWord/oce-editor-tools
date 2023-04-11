import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from '@mui/material';

export default function Section({ children, show, dir, ...props }) {

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={show}
      className={"section " + dir}
      dir={dir}
      {...props}
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
