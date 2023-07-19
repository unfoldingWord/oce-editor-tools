import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonSectionable({ children, component, ...props }) {
  return (
    <Toggle.Button
      component={component}
      value="sectionable"
      aria-label="sectionable"
      title="Sectionable"
      {...props}
    >
      {children}
    </Toggle.Button>
  );
}
