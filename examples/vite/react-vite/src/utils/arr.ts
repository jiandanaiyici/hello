/** 差集 */
export const difference = (a: Set<string>, b: Set<string>) =>
  new Set([...a].filter(key => !b.has(key)));

/** 交集 */
export const intersect = (a: Set<string>, b: Set<string>) =>
  new Set([...a].filter(key => b.has(key)));

/** 并集 */
export const union = (a: Set<string>, b: Set<string>) => new Set([...a, ...b]);
