/** 数据类型转换 */
export const objToLabelValue = <T extends string>(obj: { [key: string]: string }) => {
  const arr = Object.keys(obj) as T[];
  return arr.map((key) => ({
    key,
    value: key,
    label: obj[key],
  }));
};
