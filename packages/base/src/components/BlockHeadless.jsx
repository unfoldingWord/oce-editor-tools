import React, { useMemo } from 'react';

export function BlockHeadless({
  component,
  componentProps,
  children,
  ...props
}) {
  const BlockComponent = useMemo(() => {
    if (typeof component?.render === 'function') {
      return component;
    }
    return ({ children, ...componentProps }) => <div {...componentProps}>{children}</div>;
  }, [component]);
  const renderChildren = useMemo(
    () => (typeof children === 'function' ? children : () => children),
    [children]
  );
  return (
    <BlockComponent {...componentProps}>
      {renderChildren({ ...props })}
    </BlockComponent>
  );
}

export default BlockHeadless;
