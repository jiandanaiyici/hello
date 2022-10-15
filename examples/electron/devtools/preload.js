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
});
