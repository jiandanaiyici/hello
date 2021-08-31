import { app, ipcMain, BrowserWindow } from "electron";
import path from "path";

let tabWin: BrowserWindow;

console.log(app.releaseSingleInstanceLock())

/** 打开新窗口查看 electron-tabs 实现效果 */
async function createTabWindow() {
  tabWin = new BrowserWindow({
    width: 500,
    height: 400,
    x: 0,
    y: 0,
    title: 'Electron-Tab 及 webview 实现',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      // webSecurity: true,
      nodeIntegrationInSubFrames: true,
      // sandbox: true,
      /** 子模块 */
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  console.log(tabWin, 'tabWin')

  tabWin.on('ready-to-show', () => {
    tabWin.show();
    tabWin.focus();
  });

  if (process.env.NODE_ENV === 'development') {
    tabWin.webContents.openDevTools();
  }

  tabWin.webContents.loadURL('http://localhost:8000/#/electron-tabs');
}

ipcMain.handle('OPEN_ELECTRON_TABS', async () => {
  await createTabWindow();
  return true;
})