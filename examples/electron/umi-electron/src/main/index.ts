import { app, BrowserWindow, webFrameMain, protocol } from 'electron';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';
import path from 'path';
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer';
import './menu/context-menu';

const isDevelopment = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    x: 0,
    y: 0,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      // sandbox: true,
      /** 子模块 */
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.on('ready-to-show', function () {
    mainWindow.show();
    mainWindow.focus();
  });

  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:8000');
    mainWindow.webContents.on(
      'did-frame-navigate',
      (event, url, httpResponseCode, isMainFrame, frameProcessId, frameRoutingId) => {
        // console.log(url, isMainFrame, frameProcessId, frameRoutingId, 'isMainFrame>>>>>>>')
        const frame = webFrameMain.fromId(frameRoutingId, frameRoutingId);

        if (frame) {
        const code = 'window.a=1'
        frame.executeJavaScript(code)
        }
      }
    )
    // mainWindow.loadURL('https://twitter.com')
    mainWindow.webContents.openDevTools({ mode: 'right' });
    /** 设置顶层窗口 */
    // mainWindow.setAlwaysOnTop(true);
    // console.log(mainWindow.isAlwaysOnTop(), '>>>>>>>>是否在顶层窗口')
  } else {
    createProtocol('app');
    mainWindow.loadURL('app://./index.html');
  }
}

console.log(app.commandLine.hasSwitch('webview-tag'), '>>>>>>>>>>>.webview-tag')

app.on('ready', async () => {
  // if (isDevelopment) {
  //   await installExtension(REACT_DEVELOPER_TOOLS);
  // }
  createWindow();
});

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