export function getPrefix(suffix: string = '', prefix: string = 'fault-tree') {
  return suffix ? `${prefix}-${suffix}` : prefix;
}