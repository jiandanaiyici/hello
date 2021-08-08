import { useState, useCallback } from 'react';

interface Actions<T = any> {
  reset(): void;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

/** 默认为 value */
type EventValueType<T = any> = 'value' | 'checked' | ((evt: T) => void) | boolean;

function getValueByType(evt: any, type: EventValueType) {
  if (type === 'value' || type === 'checked') {
    return evt.target[type];
  }

  if (typeof type === 'boolean') {
    return type ? evt.target.value : evt;
  }

  if (typeof type === 'function') {
    return type(evt);
  }

  return evt;
}

const useChange = <T, E>(
  defaultValue?: T,
  type: EventValueType<E> = 'value',
): [value: T, onChange: Function | any, actions: Actions] => {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback(
    (evt) => {
      const val = getValueByType(evt, type);
      setValue(val);
    },
    [value],
  );

  const reset = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return [value, onChange, { reset, setValue }];
};

export default useChange;