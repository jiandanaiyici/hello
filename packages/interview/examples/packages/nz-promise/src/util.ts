function getType(val: any, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export function isFunction(val: any) {
  return typeof val === 'function'
}