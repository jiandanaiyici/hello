console.log('start');
setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log('4');
  setTimeout(() => {
    console.log('5');
    resolve('6');
  }, 0);
}).then((res) => {
  console.log('7');
  setTimeout(() => {
    console.log(res);
  }, 0);
});

/**
 * 1. start
 * 2. 4
 * 3. 2
 * 4. 3
 * 5. 5
 * 6. 7
 * 7. 6
 */
/**
 * 1. 执行同步任务(主线程 宏任务) 输出 start, setTimeout 放入宏任务队列中继续执行
 * 2. new Promise 创建时即执行, 输出 4, setTimeout 放入宏任务队列中 promise.then 不执行, 同步执行结束后查询微任务队列为空, 查看宏任务队列
 * 3. 执行被放入宏任务队列中的第一个 setTimeout 输出2, 接着执行 Promise.resolve 输出 3, 因为第二个 promise 并没有被第二个 setTimeout 执行也就是没有被放入微任务队列中, 本轮循环中不执行
 * 4. 执行第二个 setTimeout 输出 5. 遇到 resolve 之后调用了第二个 Promise的微任务 输出 7, 本轮微任务队列清空, 循环结束 执行最后一个 setTimeout
 * 5. 输出 第二个Promise的返回值 6
 */
