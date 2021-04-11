import { conversionObjectToArray } from "../../util";


// https://gist.github.com/surma/d473bc68902984e6ade4fbe34ed55c3c
function randomString(bytes) {
  let arr: any = new Array(bytes).fill(0);
  arr = arr.map(_ => Math.floor(Math.random() * 256));
  return btoa(arr);
}

const idLen = 16;
export function randomObject(depth, width) {
  const r = {};
  for (let i = 0; i < width; i++) {
    if (depth == 0) {
      r[randomString(idLen)] = i;
    } else {
      r[randomString(idLen)] = randomObject(depth - 1, width);
    }
  }
  return r;
}

export const spreadClone = <T = object>(source: T): T => ({ ...source });
export const assignClone = <T = object>(source: T): T => Object.assign({}, source);

export const forClone = <T>(source: T): T => {
  let result = {} as T;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = source[key];
    }
  }

  return result;
}

const jsonClone = <T = any>(source: T): T => JSON.parse(JSON.stringify(source));

/** 结构化克隆法 */
function messageChannel<T = any>(source: T): Promise<T> {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();

    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(source);
  });
}

function notificationClone<T = any>(source: T): T {
  return new Notification('', { data: source, silent: true }).data;
}

type CloneFnKey = 'spread' | 'assign' | 'for' | 'json' | 'message' | 'notification';
interface LabelOption {
  text: string;
  fn: any;
}

const CLONE_ENUM = {
  spread: {
    text: '扩展运算符',
    fn: spreadClone
  },
  assign: {
    text: 'Object.assign',
    fn: assignClone,
  },
  json: {
    text: 'JSON',
    fn: jsonClone
  },
  message: {
    text: 'MessageChannel',
    fn: messageChannel
  },
  notification: {
    text: 'Notification',
    fn: notificationClone
  }
}

export const cloneFnList = conversionObjectToArray<CloneFnKey, LabelOption>(CLONE_ENUM);