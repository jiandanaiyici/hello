import moment from 'moment';

export function getLineTicks(start?: string, end?: string) {
  const diff = moment(end).diff(start, 'day');
  const generateTickData = (num: number) => {
    const list = Array(num + 1)
      .fill(1)
      .map((_, idx) => ({
        id: idx,
        text: moment(start).add(idx, 'days').format('MM-DD'),
      }));

    return list;
  };

  return generateTickData(diff);
}

export function getChartTicks(start?: string, end?: string) {
  const diffTime = moment(end).diff(moment(start));
  if (diffTime > 0 && diffTime < 86400 * 1000) {
    return 1;
  }
  return Math.ceil(diffTime / 1000 / 86400);
}