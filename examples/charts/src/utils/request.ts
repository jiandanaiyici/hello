import request from 'umi-request';


const customRequest = <T = any>(url: string, options?: any) => {
  return request<T>(url, options);
}

export default customRequest;