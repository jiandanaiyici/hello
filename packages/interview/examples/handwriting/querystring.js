const obj = {
  a: '1',
  b: '2',
  // c: {
  //   name: 'name',
  // },
};
// 期望输出值: a=1&b=2
function toQueryStringOne(value) {
  return Object.keys(value)
    .map((key) => `${key}=${value[key]}`)
    .join('&');
}

function toQueryStringTwo(value) {
  return Object.entries(value)
    .map((item) => `${item[0]}=${item[1]}`)
    .join('&');
}

function toQueryStringOneWithObject(value) {
  const result = [];
  for (const key in value) {
    const v =
      Object.prototype.toString.call(value[key]) === '[object Object]'
        ? toQueryStringOneWithObject(value[key])
        : `${key}=${value[key]}`;
    result.push(v);
  }

  return result.join('&');
}
function toQueryStringThree(value) {
  const result = [];
  for (const key in value) {
    result.push(`${key}=${value[key]}`);
  }

  return result.join('&');
}

function toQueryStringFour(value) {
  return JSON.stringify(value)
    .replace(/{|}|\"/g, '')
    .replace(/\:/g, '=')
    .split(',')
    .join('&');
}

function toQueryStringFive(value) {
  const re = /({|}|\")|(\:)/g;
  return JSON.stringify(value)
    .replace(re, (match) => (match === ':' ? '=' : ''))
    .split(',')
    .join('&');
}

console.log(toQueryStringOne(obj));
console.log(toQueryStringTwo(obj));
console.log(toQueryStringOneWithObject(obj));
console.log(toQueryStringFour(obj));
console.log(toQueryStringFive(obj));

/*************************华丽的分割线***********************/

const str = 'a=1&b=2&c=3';
// 期望输出 { a: 1, b: 2, c: 3 }

function stringToObject(data) {
  return data.split('&').reduce((prev, next) => {
    const [key, value] = next.split('=');
    prev[key] = value;
    return prev;
  }, {});
}

// 那么既然可以使用 JSON.stringify 转 string, 就可以 string 转对象

console.log(stringToObject(str));
