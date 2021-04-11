// import { request } from 'umi';

export async function queryHeatDataService() {
  // return request('/queryHeatMapData.json');
  return fetch(
    // 'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json',
    'https://a.amap.com/jsapi_demos/static/resource/heatmapData.js'
  ).then((res) => res.text());
}

export async function queryGeoHeatDataService() {
  return fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
    // 'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json',
  ).then((res) => res.json());
}

export async function queryCityService() {
  return fetch(
    'https://github.com/niexiaofei1988/hellodata/blob/master/data/all_china_tree.json',
  ).then((res) => res.json());
}
