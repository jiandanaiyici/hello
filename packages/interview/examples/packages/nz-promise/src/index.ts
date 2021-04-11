// https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change
// import { isFunction } from './util';

class NzPromise {
  state: State;
  value: any;

  constructor(executor) {
    this.state = 'pending';

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
      }
    };

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}

