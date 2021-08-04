Array.prototype.bubble = function () {
  let temp; // 为了缓存交换变量值
  for (let index = 0; index < this.length - 1; index++) {
    for (let j = 0; j < this.length - index - 1; j++) {
      if (this[j] > this[j + 1]) {
        temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
  return this;
};
