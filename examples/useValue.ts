import { useEffect, useState } from "react";

/** Hook resets "value", when "deps" change */
export function useValue<T>(_value: T, deps: any[]): [T, (value: T) => void] {
  const [value, setValue] = useState(_value);
  const [prevDeps, setPrevDeps] = useState(deps);

  useEffect(() => {
    setValue(_value);
    setPrevDeps(deps);
  }, deps);

  if (deps.length != prevDeps.length) {
    return [_value, setValue];
  }

  for (let i = 0; i < deps.length; i++) {
    if (deps[i] != prevDeps[i]) {
      return [_value, setValue];
    }
  }

  return [value, setValue];
}
