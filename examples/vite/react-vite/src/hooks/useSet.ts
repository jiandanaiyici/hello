import { useState, useMemo, useCallback } from 'react';

interface StableActions<K> {
  add: (key: K | K[]) => void;
  remove: (key: K | K[]) => void;
  reset: () => void;
}

const addKeys = <K>(key: K | K[]) => (Array.isArray(key) ? key : [key]);

interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
}

function useSet<K>(initialValue?: Iterable<K>): [Set<K | K[]>, Actions<K>] {
  const initialSet = useMemo<Set<K>>(
    () =>
      (initialValue === undefined ? new Set() : new Set(initialValue)) as Set<
        K
      >,
    [initialValue],
  );
  const [set, setSet] = useState(initialSet);

  /**
   * @todo
   * 1. add
   * 2. remove: 增加第二个参数 remove(key, fn: (key, item: T) => boolean) => 这里使用的是 filter((item) => fn(key, item))
   * 3. reset: 重置不变动
   * 4. clean: 新增清空
   */
  const stableActions = useMemo<StableActions<K>>(
    () => ({
      add: key =>
        setSet(prevSet => {
          return new Set([...Array.from(prevSet), ...addKeys(key)]);
        }),
      remove: key =>
        setSet(
          prevSet =>
            new Set(Array.from(prevSet).filter(i => !addKeys(key).includes(i))),
        ),
      reset: () => setSet(initialSet),
    }),
    [setSet],
  );

  /**
   * @todo
   * 5. has: 增加第二个参数
   * has: useCallback(() => {
      这里假设传递的数据是可变的 且是引用类型对象,
      key: 需要判断的 key
      fn: (type) type ---> 根据唯一指定的 标识
      has(key, fn: (type) => new Set(set.map(item => item[type])).has(key))
   * }, [set]);
   */
  const utils = {
    has: useCallback(key => set.has(key), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
}

export default useSet;
