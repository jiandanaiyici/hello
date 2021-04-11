import { mock } from 'mockjs';

export const heatData = mock({
  'data|500': [
    {
      'lng|99-112.6': 102.620655,
      'lat|26-33.6': 30.920677,
      'count': '@integer(60, 1000)',
    },
  ],
});

export default {
  /** 热力图 */
  'GET /queryHeatMapData.json': {
    success: true,
    ...heatData
  },
};
