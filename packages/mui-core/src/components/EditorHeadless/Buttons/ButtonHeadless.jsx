import React, { useMemo } from 'react'

export function ButtonHeadless({
  disabled,
  component,
  componentProps,
  children,
  onClick,
  ...props
}) {
  const ButtonComponent = useMemo(() => {
    if (typeof component?.render === 'function') {
      return component;
    }
    return ({ children, ...componentProps }) => (
      <button {...componentProps}>{children}</button>
    );
  }, [component]);
  const renderChildren = useMemo(
    () => (typeof children === 'function' ? children : () => children),
    [children]
  );
  return (
    <ButtonComponent
      {...componentProps}
      disabled={disabled}
      onClick={onClick}
    >
      {renderChildren({ ...props })}
    </ButtonComponent>
  );
}

export default ButtonHeadless