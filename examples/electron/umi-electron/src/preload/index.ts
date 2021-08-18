import { contextBridge, ipcRenderer } from 'electron';

const apiKey = 'electron';

const api: any = {
  versions: process.versions,
  ipcRenderer,
};

contextBridge.exposeInMainWorld(apiKey, api);
