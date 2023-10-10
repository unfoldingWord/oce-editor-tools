import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from '@mui/joy';

export default function Section({ children, show, dir, ...props }) {

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
