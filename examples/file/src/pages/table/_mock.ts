import { Random } from 'mockjs';

const list = Array(100)
  .fill(1)
  .map(() => {
    return {
      id: Random.id(),
      name: Random.cname(),
      address: `${Random.province()} - ${Random.city()}`,
    };
  });

export default {
  list,
  total: list.length,
};
