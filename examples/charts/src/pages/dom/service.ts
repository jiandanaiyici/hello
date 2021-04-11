import { stringify } from 'qs';
import request from 'umi-request';

export function queryProjectListService() {
  return request('/queryProjectList.json');
}

export function queryGanttListService(params: { projectId: string; }) {
  return request(`/queryGanttList.json?${stringify(params)}`);
}