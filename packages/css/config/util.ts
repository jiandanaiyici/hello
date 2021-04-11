import path from 'path';

export const resolve = (name: string) =>
  path.resolve(__dirname, path.join(__dirname, name));
