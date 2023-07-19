import { useState } from "react";

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = () => {
    setValue((value) => !value);
  };
  return [value,toggleValue]
}

export default useToggle;