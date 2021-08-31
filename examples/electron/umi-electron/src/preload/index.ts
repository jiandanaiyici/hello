import { contextBridge, ipcRenderer } from 'electron';

const apiKey = '__ELECTRON_BRIDGE__';

const api: ElectronBridgeApi = {
  versions: process.versions,
  ipcRenderer,
};

// delete window.module;

// window[apiKey] = api;
contextBridge.exposeInMainWorld(apiKey, api);
