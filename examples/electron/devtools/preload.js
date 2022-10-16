const { contextBridge, ipcRenderer } = require('electron');

function success(msg) {
  console.log(`%c ${msg}`, 'background: green');
}

const stop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  return;
};

window.document.addEventListener('click', stop);

contextBridge.exposeInMainWorld('__APIS__', {
  ipcRenderer,
  openNewWin: async (url) => {
    const result = await ipcRenderer.invoke('open-new-window', url);
    if (result) {
      success('成功!');
    }
  },
  /** 加载 webview 页面 */
  loadWebviewPage: async () => {
    const result = await ipcRenderer.invoke('load-webview-page');
    if (result) {
      success('打开 webview 成功!');
    }
  },
  /** 手动打开 webview 控制台 */
  openWebviewDevtools: async (targetId) => {
    const result = await ipcRenderer.invoke('open-webview-devtools', targetId);
    if (result) {
      success('打开 控制台成功');
    }
  },
  /** 手动关闭 */
  closeWebviewDevtools: async (targetId) => {
    const result = await ipcRenderer.invoke('close-webview-devtools', targetId);
    if (result) {
      success('关闭成功!');
    }
  },
  /** 设置控制台内容 */
  settingDevToolContents: async (targetId, devId) => {
    const result = await ipcRenderer.invoke(
      'setting-devtool-content',
      targetId,
      devId
    );
    if (result) {
      success('设置成功!');
    }
  },
});
