import { notification, message } from 'antd';
import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosRequest = axios.create();

const checkSuccess = (res: AxiosResponse) => {
  if (res.status === 200 && res.data && res.data.success) {
    message.success('操作成功');
    return res.data;
  }
  return res;
};

const errHandler = (error: AxiosError) => {
  const { response = { status: '' } } = error;
  notification.error({
    message: '请求失败!',
    description: response.status,
  });
  return Promise.reject(error);
};

axiosRequest.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

axiosRequest.interceptors.response.use(checkSuccess, errHandler);

export default axiosRequest;
