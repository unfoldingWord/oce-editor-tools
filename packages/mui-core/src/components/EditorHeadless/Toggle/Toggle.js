import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ToggleGroupContext = createContext();
const useToggleGroupContext = () => useContext(ToggleGroupContext);

function Group({
  children,
  values: controlledValues,
  defaultValues = [],
  onChange
}) {
  const isControlled = typeof controlledValues !== 'undefined';
  const hasDefaultValues = typeof defaultValues !== 'undefined';

  const [internalValues, setInternalValues] = useState(hasDefaultValues ? defaultValues : []);

  const values = isControlled ? controlledValues : internalValues;

  const setValues = useCallback((param) => {
    const newValues = typeof param === 'function' ? param(values) : param;
    if (onChange) {
      onChange(newValues);
    }
    if (!isControlled) {
     setInternalValues(newValues);
    }
  }, [onChange, values, isControlled]);

  const context = {
    state: { values },
    actions: { setValues },
  };
  return (
    <ToggleGroupContext.Provider value={context}>
      {children}
    </ToggleGroupContext.Provider>
  );
}

function Button({
  value: buttonValue,
  selected: defaultSelected,
  disabled,
  component,
  componentProps,
  children,
  onClick: _onClick,
  ...props
}) {
  const [selected, setSelected] = useState(defaultSelected);
  const { state, actions } = useToggleGroupContext();
  const { setValues } = actions;
  const { values } = state;
  const renderChildren = useMemo(
    () => (typeof children === 'function' ? children : () => children),
    [children]
  );
  const Button = useMemo(() => {
    if (typeof component?.render === 'function') {
      return component;
    }
    return ({ children, ...componentProps }) => (
      <button {...componentProps}>{children}</button>
    );
  }, [component]);
  useEffect(
    (e) => {
      setSelected(() =>
        values?.some((value) => value === buttonValue) ? true : false
      );
    },
    [values, setSelected, buttonValue]
  );
  const toggleValue = useCallback(
    (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (selected) {
        setValues((values) => values.filter((value) => value !== buttonValue));
      } else {
        setValues((values) => [...values, buttonValue]);
      }
      if (typeof _onClick === 'function') _onClick(e, buttonValue, !selected);
    },
    [selected, buttonValue, disabled, _onClick, setValues]
  );
  return (
    <Button
      {...componentProps}
      selected={selected}
      disabled={disabled}
      value={buttonValue}
      onClick={toggleValue}
      className={selected ? 'selected' : ''}
    >
      {renderChildren({ selected, disabled, value: buttonValue, ...props })}
    </Button>
  );
}

const Toggle = { Group, Button }

export default Toggle;
