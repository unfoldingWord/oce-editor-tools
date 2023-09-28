import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonBlockable({ children, component, ...props }) {
  return (
    <Toggle.Button
      component={component}
      componentProps={{
        value:"blockable",
        'aria-label':"blockable",
        title:"Blockable",
        ...props
      }}
    >
      {children}
    </Toggle.Button>
  );
}
