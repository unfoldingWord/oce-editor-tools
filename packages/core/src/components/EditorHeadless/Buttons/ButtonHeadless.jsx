import React, { useMemo } from 'react'

export function ButtonHeadless({
  disabled,
  component,
  children,
  onClick,
  ...props
}) {
  const ButtonComponent = useMemo(() => {
    if (typeof component?.render === 'function') {
      return component;
    }
    return ({ children, ...props }) => <button {...props}>{children}</button>;
  }, [component]);
  const renderChildren = useMemo(
    () => (typeof children === 'function' ? children : () => children),
    [children]
  );
  return (
    <ButtonComponent
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {renderChildren({ ...props })}
    </ButtonComponent>
  );
}

export default ButtonHeadless