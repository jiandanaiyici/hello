import axiosRequest from '@/utils/axiosRequest';

/** 上传单张图片 */
export async function uploadSingleImageToServerService(params: any) {
  return axiosRequest.post(`/server/upload/single/image`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/** 上传多张图片 */
export async function uploadMultipleImageToServerService(params: any) {
  return axiosRequest.post(`/server/upload/multiple/image`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
