import uuidv1 from 'uuid/v1';
import { SingleImageInt } from './interface';

/** 格式化 File 对象 */
export function getFileBlobUrls(files: File[]): SingleImageInt[] {
  return Array.isArray(files)
    ? files.map(file => ({
        ...file,
        uid: uuidv1(),
        url: URL.createObjectURL(file),
      }))
    : [];
}

/** 使用 FileReader 读取文件 */
export function getSingleImageResult(file: File) {
  return new Promise((resolve, reject) => {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();

      reader.onerror = () => {
        reader.abort(); // 取消
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onload = () => resolve(reader.result);

      reader.readAsDataURL(file);
    }
  });
}

export function getFileResultByFileReader(files: File[]) {
  const promise = Promise.resolve();
  return Promise.all(
    files.map(file =>
      promise.then(async () => ({
        url: await getSingleImageResult(file),
        ...file,
        uid: uuidv1(),
      })),
    ),
  );
}
