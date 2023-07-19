import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonLock({ children, component, ...props }) {
  return (
    <Toggle.Button
      component={component}
      value="locked"
      aria-label="lock"
      title="Lock"
      {...props}
    >
      {children}
    </Toggle.Button>
  );
}
