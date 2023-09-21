import React from 'react';
import Toggle from '../Toggle/Toggle';
import { useEditorContext } from '../Editor';

export default function ButtonLock({ children, component, ...props }) {
  const { state } = useEditorContext();
  const { isControlled } = state;
  return isControlled ? (
    <Toggle.Button
      component={component}
      value={'locked'}
      componentProps={{
        'aria-label': 'lock',
        title: 'Lock',
        ...props,
      }}
    >
      {children}
    </Toggle.Button>
  ) : null;
}
