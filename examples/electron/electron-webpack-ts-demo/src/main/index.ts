import path from 'path';
import url from 'url';
import { app, BrowserWindow } from 'electron';

let mainWindow: Electron.BrowserWindow | null;

const buildPath = app.getAppPath();

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      // preload: path.resolve(__dirname, './preload/index.ts'),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      webviewTag: true,
      // nodeIntegration: false,
      nativeWindowOpen: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
    }
  });

  // @ts-ignore
  global.title = 'Yay! Welcome to umi-electron-typescript!';

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(buildPath, '../','./renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

/** 在 Mac 系统中, 所有窗口关闭后 应用程序退出 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
