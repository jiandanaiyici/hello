const publishData = Array(5).fill(1).map((_: any, idx: number) => ({
  code: `${idx}`,
  codeName: `测试-${idx}`,
}));
const total = 100;
const list = Array(total)
  .fill(1)
  .map((_, idx: number) => ({
    id: idx,
    name: `name${idx + 1}`,
    age: idx + 1,
    checked: idx % 4 === 0,
    address: `address-${idx + 1}`,
    publishData,
  }));

export const queryDataService = <T = any>({
  pageNum,
  pageSize,
}: {
  pageNum: number;
  pageSize: number;
}): Promise<T> => {
  const data = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: data,
        total,
      });
    }, 100);
  });
};
