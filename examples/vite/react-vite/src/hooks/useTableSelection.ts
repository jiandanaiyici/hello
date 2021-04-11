/* eslint-disable no-shadow */
import { useState, useMemo } from 'react';

export default function useTableSelection<T>(
  items: T[],
  defaultSelected: T[] = [],
) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const { selectedSet, isSelected, select, unSelect, toggle } = useMemo(() => {
    const selectedSet = new Set<T>(selected);

    /** @todo: 加入传递的数据为可变的值就失效, 虽然可以解决 NaN的情况, 但依旧是 */
    const isSelected = (item: T) => selectedSet.has(item);

    /** @todo: 同上逻辑 */
    const select = (item: T) => {
      selectedSet.add(item);
      return setSelected(Array.from(selectedSet));
    };

    /** @todo: 同上 */
    const unSelect = (item: T) => {
      selectedSet.delete(item);
      return setSelected(Array.from(selectedSet));
    };

    /** @todo: 同上, isSelected 判断在数据为可变时就会失效 */
    const toggle = (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return { selectedSet, isSelected, select, unSelect, toggle };
  }, [selected]);

  const {
    selectAll,
    unSelectAll,
    noneSelected,
    allSelected,
    partiallySelected,
    toggleAll,
  } = useMemo(() => {
    const selectAll = () => {
      items.forEach(o => {
        selectedSet.add(o);
      });
      setSelected(Array.from(selectedSet));
    };

    const unSelectAll = () => {
      items.forEach(o => {
        selectedSet.delete(o);
      });
      setSelected(Array.from(selectedSet));
    };

    const noneSelected = items.every(o => !selectedSet.has(o));

    const allSelected = items.every(o => selectedSet.has(o)) && !noneSelected;

    const partiallySelected = !noneSelected && !allSelected;

    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

    return {
      selectAll,
      unSelectAll,
      noneSelected,
      allSelected,
      partiallySelected,
      toggleAll,
    };
  }, [selectedSet, items]);

  return {
    selected,
    isSelected,
    select,
    unSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll,
    allSelected,
    noneSelected,
    partiallySelected,
    setSelected,
  } as const;
}

/**
 * @todo: 参考 ahooks useSelections
 * 由于 ahooks 中可能算是一种小问题, 如果设置了 checkbox 为 禁选状态, 其他的操作就不再准
 * 1. 返回类型及支持功能 同上
 * 2. 考虑 Checkbox 中的 禁选状态
 * 3. 考虑兼容数据变动(即表示传递的数据非固定不变的格式, 哪怕是对象, 只要变动了就无法再使用 set 方法)
 * 4. 结合 Table 的全选 及 自定义全选控制, 需要过滤掉禁选的选项
 */
