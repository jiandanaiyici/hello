import moment from 'moment';
import { CHANNEL_TEXTS } from "@/components/GanttTree/contant";
import { ChildData, GanttTreeData } from "@/components/GanttTree/interface";

function getOffsetByChartData(data: ChildData, startDate: string, endDate: string) {
  const offsetX = Math.abs(moment(data.startDate).diff(moment(startDate), 'day'));
  return {
    ...data,
    offsetX,
  }
}

function formatData(list: ChildData[], start: string, end: string) {
  const result = list.reduce((prev: any, next) => {
    const nextData = getOffsetByChartData(next, start, end);
    let prevData = { ...prev };
    const childData = prev[next.channel] && prev[next.channel].children ? prev[next.channel].children.concat(nextData) : [nextData];
    prevData[next.channel] = { children: childData };
    return prevData;
  }, {} as any);

  const data = Object.keys(result).map(key => {
    return {
      key,
      // 中文
      title: CHANNEL_TEXTS[key],
      children: result[key].children
    }
  });

  return data;
}

/** 转换数据: 如果有 startDate, endDate 则使用, 如果为空, 这自动使用递归循环查找最大 最小值 */
export function transformToDataSource(list: GanttTreeData[], startDate?: string, endDate?: string) {
  const start = startDate ?? '';
  const end = endDate ?? '';

  return list.map(item => ({
    ...item,
    children: formatData(item.children, start, end)
  }))
}