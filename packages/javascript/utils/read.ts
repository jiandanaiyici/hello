import fs from 'fs';

const { readdir, readFile } = fs.promises;

export async function getDirNames(pathName: string, withFileTypes?: false) {
  return readdir(pathName, {
    encoding: 'utf-8',
    // 开启时返回的是对象
    withFileTypes,
  });
}

export async function readDataByPathName(pathName: string) {
  return readFile(pathName, 'utf-8');
}
