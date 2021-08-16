import { stringify } from 'querystring';
import request from '@/utils/request';

export async function downloadExcelService(params?: any) {
  return request(`/server/download/downloadExcel?${stringify(params)}`, {
    responseType: 'blob',
    // todo 此处不能设置 getResponse, 返回的 response 中会包含有 data 和 response, 后续需要处理
    // getResponse: true,
  });
}
