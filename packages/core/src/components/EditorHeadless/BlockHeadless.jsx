import React, { useMemo } from 'react';

export function BlockHeadless({
  component,
  children,
  ...props
}) {
  const BlockComponent = useMemo(() => {
    if (typeof component?.render === 'function') {
      return component;
    }
    return ({ children, ...props }) => <div {...props}>{children}</div>;
  }, [component]);
  const renderChildren = useMemo(
    () => (typeof children === 'function' ? children : () => children),
    [children]
  );
  return (
    <BlockComponent {...props}>
      {renderChildren({ ...props })}
    </BlockComponent>
  );
}

export default BlockHeadless;
