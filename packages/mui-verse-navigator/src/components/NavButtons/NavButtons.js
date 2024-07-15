import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const navButtonsStyle = {
  width: '34px',
  height: '44px',
  paddingLeft: '0px',
  paddingRight: '0px',
  marginLeft: '-7px',
  marginRight: '-7px'
}

const narrowIconsStyle = {
  marginLeft: '-8px',
  marginRight: '-8px'
}

export const NAV_TYPES_DOUBLE_PREV = 0;
export const NAV_TYPES_PREV = 1;
export const NAV_TYPES_NEXT = 2;
export const NAV_TYPES_DOUBLE_NEXT = 3;

function getIcon(type) {
  switch (type) {
    case NAV_TYPES_DOUBLE_PREV:
      return (
        <>
          <NavigateBefore style={narrowIconsStyle}/>
          <NavigateBefore style={narrowIconsStyle}/>
        </>
      );
    case NAV_TYPES_DOUBLE_NEXT:
      return (
        <>
          <NavigateNext style={narrowIconsStyle}/>
          <NavigateNext style={narrowIconsStyle}/>
        </>
      );
    case NAV_TYPES_PREV:
      return (
        <NavigateBefore/>
      );
    case NAV_TYPES_NEXT:
    default:
      return (
        <NavigateNext/>
      );
  }
}

export function NavButtons({
  id,
  type,
  style = {},
  title,
  onClick,
}) {
  const style_ = { ...navButtonsStyle, ...style }; // style property will override default style

  return (
      <Button variant="text" id={id} size="large" style={style_} onClick={onClick} title={title}>
        {getIcon(type)}
      </Button>
  )
}

NavButtons.propTypes = {
  type: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default NavButtons;
