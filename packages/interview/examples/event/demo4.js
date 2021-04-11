console.log(1);
/** setTimeout1 */
setTimeout(function () {
  console.log(2);
}, 0);

const intervalId = setInterval(function () {
  console.log(3);
}, 0);

setTimeout(function () {
  console.log(10);
  new Promise(function (resolve) {
    console.log(11);
    resolve();
  })
    .then(function () {
      console.log(12);
    })
    .then(function () {
      console.log(13);
      clearInterval(intervalId);
    });
}, 0);

Promise.resolve()
  .then(function () {
    console.log(7);
  })
  .then(function () {
    console.log(8);
  });

console.log(9);

/**
 * 1
 * 9
 * 7
 * 8
 * 2
 * 3
 * 10
 * 11
 * 12
 * 13
 */

/**
 * 1. 先执行同步任务, 输出 1 和 9 , setTimeout setInterval 放入宏任务队列, Promise.resolve 放入微任务队列
 * 2. 按照定义, 检查微任务队列, 输出 7 和 8, 此时已经没有微任务队列了, 接着检查宏任务队列, 取第一个执行
 * 3. 按照顺顺序 输出 2 检查微任务队列, 为空, 则进入下一次的循环宏任务
 * 4. 输出 3, 检查微任务队列 为空, 下一次宏任务循环
 * 5. 输出 10 和 11(new Promise 在遇到 resolve 或者 reject 之前的都属于同步代码) 将 Promise 放入微任务队列中, 检查微任务队列
 * 6. 执行了上一次的宏任务, 检查微任务队列 并清空执行 输出 12 和 13
 *
 *
 */
