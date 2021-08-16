// 下载文件
// todo: 下载乱码, 下载名称获取
export function downloadFile(data: string) {
  // if (typeof data !== 'string') return;
  const downloadLink = document.createElement('a');
  const url = window.URL.createObjectURL(new Blob([data]));
  downloadLink.style.display = 'none';
  downloadLink.href = url;
  downloadLink.download = '1.xls';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
}

// 普通下载输入内容
export function normalDownloadFile(data: string, fileName: string) {
  const downloadLink = document.createElement('a');
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const fileUrl = URL.createObjectURL(file);
  downloadLink.href = fileUrl;
  downloadLink.download = fileName;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  window.URL.revokeObjectURL(fileUrl);
  document.body.removeChild(downloadLink);
}

export function getFormValuesByPromise(validateFields: Function): Promise<any> {
  return new Promise((resolve, reject) =>
    validateFields((err: any, values: any) => {
      if (err) return reject(err);
      return resolve(values);
    }),
  );
}

export function previewImage(file: File) {
  console.log(file, '>>>>>>>>>.previewImage');
}
