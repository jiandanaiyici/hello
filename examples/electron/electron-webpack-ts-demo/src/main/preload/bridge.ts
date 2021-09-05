const { contextBridge, ipcRenderer } = require('electron');

const API_KEY = '__ELECTRON_BRIDGE_API';

contextBridge.exposeInMainWorld(API_KEY, {
  ipcRenderer,
})