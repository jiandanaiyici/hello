/**
 *
 * @param https://github.com/afc163/array-tree-filter#readme
 * 用于 search 搜索
 */

/* eslint-disable no-loop-func */
/* eslint-disable func-names */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
export const arrayTreeFilter = <T>(
  data: T[],
  filterFn: (item: T, level: number) => boolean,
  options?: {
    childrenKeyName?: string;
  },
) => {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  var children = data || [];
  var result: T[] = [];
  var level = 0;

  do {
    var foundItem: T = children.filter(function (item) {
      return filterFn(item, level);
    })[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = (foundItem as any)[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);
  return result;
};

export const isArray = (data: any) => Array.isArray(data);
export const isEmptyArray = (data: any) => isArray(data) && data.length === 0;
