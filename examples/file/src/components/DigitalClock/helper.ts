export function zeroPadding(num: number, digit: number = 2) {
  let zero = '';
  for (let i = 0; i < digit; i += 1) {
    zero += '0';
  }
  return `${zero}${num}`.slice(-digit);
}

export const week = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

export function getCurrentDate(dateTime: number, separator: string = '-') {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    currentTime: `${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(
      second,
    )}`,
    currentDate: `${year}${separator}${zeroPadding(
      month,
    )}${separator}${zeroPadding(day)} ${week[weekDay]}`,
  };
}
