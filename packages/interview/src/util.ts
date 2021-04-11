export const conversionObjectToArray = <K extends string, L = any>(source: object) => (Object.keys(source) as K[]).map(key => ({
  key,
  value: key,
  label: source[key as string] as L,
}));