import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonSearch({ children, component, onSearch, ...props }) {
  return (
    <Toggle.Button
      component={component}
      value="search"
      aria-label="search"
      onClick={onSearch}
      title="Search"
      {...props}
    >
      {children}
    </Toggle.Button>
  );
}
