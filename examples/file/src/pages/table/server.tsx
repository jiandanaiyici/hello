/**
 * 远程表格数据下载
 */
import React, { Fragment } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { downloadExcelService } from './service';
import { downloadFile } from '@/utils/download';

const ExportTableDataFromServer: React.FC = () => {
  async function downloadExcel() {
    const data: any = await downloadExcelService();
    if (data) {
      downloadFile(data);
    }
  }

  // todo: 在线预览

  return (
    <Fragment>
      <h5>远程表格数据下载</h5>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={downloadExcel}
      >
        下载Excel
      </Button>
    </Fragment>
  );
};

export default ExportTableDataFromServer;
