const str = 'a_b_c_d_e'; // updateVersion

function toHump(data) {
  return data.replace(/(\_\w)/g, (match) => match.charAt(1).toUpperCase());
}

function toHumpOne(data) {
  return data
    .split('_')
    .map((item, index) =>
      index === 0 ? item : item.charAt(0).toUpperCase().concat(item.slice(1)),
    )
    .join('');
}

function toHumpTwo(data) {
  const result = [];
  let index = 0;
  for (let i = 0, len = data.length; i < len; i++) {
    if (data[i] === '_') {
      index = i + 1;
      continue;
    }
    const v = index === i ? data[i].toUpperCase() : data[i];
    result.push(v);
  }
  return result.join('');
}

function toHumpThree(data) {
  const result = [];
  let index = 0;
  const len = data.length;

  while (index < len) {
    if (data[index] === '_') {
      result.push(data[index + 1].toUpperCase());
      index++;
    } else {
      result.push(data[index]);
    }
    index++;
  }

  return result.join('');
}

console.log(toHump(str));
console.log(toHumpTwo(str));
console.log(toHumpOne(str));
console.log(toHumpThree(str));

function toUndeline(data) {
  return data.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

console.log(toUndeline(toHump(str)));
