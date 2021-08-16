import { merge } from 'lodash';
import XLSX from 'xlsx';

// console.log(XLSX, 'XLSX>>>>>>>>>>');

/** 导出类型 */
export type ExportFileType = 'csv' | 'excel' | 'json';

export interface Options {
  /** 导出名称 */
  filename?: string;
  /** 导出类型 */
  fileType?: ExportFileType;
}

const defaultConfig: Partial<Options> = {
  filename: 'download',
  fileType: 'excel',
};

class ExportData {
  public config: Options;
  constructor(opts?: Options) {
    this.config = merge(defaultConfig, opts);
  }

  public updateConfig(opts?: Partial<Options>) {
    this.config = merge(this.config, opts);
  }

  public getConfig() {
    return this.config;
  }

  public getFileName() {
    return this.config.filename;
  }

  /** csv 转 sheet */
  private csv2sheet(data: string) {
    /** 将要生成的sheet */
    const sheet = {};
    const result = data.split('\n');
    result.forEach(function(row, i) {
      const rowData = row.split(',');
      if (i == 0) {
        sheet['!ref'] =
          'A1:' +
          String.fromCharCode(65 + rowData.length - 1) +
          (result.length - 1);
      }
      rowData.forEach(function(col, j) {
        sheet[String.fromCharCode(65 + j) + (i + 1)] = { v: col };
      });
    });
    return sheet;
  }

  private getUrl(): any {
    this.csv2sheet('');
    return '';
  }

  public download(name?: string) {
    let url = this.getUrl();
    if (typeof url === 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url);
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    const saveName = name ?? this.getFileName() ?? 'down';

    /** 指定保存文件名 */
    aLink.download = saveName;
    // document.body.appendChild(aLink);
    // aLink.click();
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(aLink);
  }
}

export default ExportData;
