const sArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const arr = Array(sArr.length)
  .fill(1)
  .map((_, index) => ({
    src: `${sArr[index]}-left`,
    target: `${sArr[index]}-right`,
  }));

/** 假设连接的数据是
 * A-left --> C-right
 * B-left --> A-right
 * C-left --> D-right
 * 
 * const left = ['A-left', 'B-left', 'C-left']
 * const right = ['C-right', 'A-right', 'D-right']
 * 
 * 那么最终 arr 的数据应该是
 * 
 * [{
  src: 'A-left',
  target: 'C-right'
}, {
  src: 'B-left',
  target: 'A-right'
}, {
  src: 'C-left',
  target: 'D-right'
}, {
  src: 'D-left',
  target: 'B-right'
}, {
  // 其他不变
}]
 */
