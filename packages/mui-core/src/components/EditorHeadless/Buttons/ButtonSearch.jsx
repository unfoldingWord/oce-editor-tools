import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonSearch({ children, component, onSearch, ...props }) {
  return (
    <Toggle.Button
      component={component}
      value={'search'}
      componentProps={{
        'aria-label': 'search',
        title: 'Search',
        ...props,
      }}
      onClick={onSearch}
    >
      {children}
    </Toggle.Button>
  );
}
