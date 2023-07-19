import React from 'react';
import Toggle from '../Toggle/Toggle';

export default function ButtonPreview({ children, component, ...props }) {
  return (
    <Toggle.Button
      component={component}
      value="preview"
      aria-label="preview"
      title="Preview"
      {...props}
    >
      {children}
    </Toggle.Button>
  );
}
