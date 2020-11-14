import { mock, Random } from 'mockjs';

export const list = mock({
  'list|5': [
    {
      'id|+1': 1,
      'name': '@cname',
      'address': '@city',
      'age': '@integer(10, 70)'
    },
  ],
}).list;
