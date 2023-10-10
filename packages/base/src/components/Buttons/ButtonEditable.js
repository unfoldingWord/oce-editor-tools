import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonEditable({ children, component, ...props }) {
  return (
    <Toggle.Button
      component={component}
      value={'editable'}
      componentProps={{
        'aria-label': 'editable',
        title: 'Editable',
        ...props,
      }}
    >
      {children}
    </Toggle.Button>
  );
}
