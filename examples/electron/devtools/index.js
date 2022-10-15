const path = require('path');
const colors = require('colors');

const { app, ipcMain, BrowserWindow } = require('electron');

const preloadPath = path.join(path.resolve(__dirname, './preload.js'));

let win = null;

const indexUrl = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html'),
});

const createWindow = (opts = {}) => {
  const defaultOptions = {
    width: 1200,
    height: 800,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    simpleFullscreen: false,
    skipTaskbar: false,
    show: false,
    ...opts,
    webPreferences: {
      devTools: true,
      preload: preloadPath,
    },
  };
  const innnerWin = new BrowserWindow(defaultOptions);

  innnerWin.on('ready-to-show', () => {
    win.show();
  });
  innnerWin.webContents.on('dom-ready', () => {
    win.webContents.openDevTools();
  });

  innnerWin.on('closed', () => {
    innnerWin.destroy();
  });

  return innnerWin;
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }

      win.focus();
    } else {
      win = innnerWin();
    }
  });

  app.on('ready', () => {
    win = createWindow();
    win.loadURL(indexUrl);
  });

  app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
      app.quit();
    }
  });

  app.on('web-contents-created', (_event, content) => {
    // const openType = content.getType();
    // console.log(openType, '>>>>>>>>>>>>>');
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows()?.length === 0) {
      createWindow();
    }
  });

  /** events */

  /** 通过 webContents 方式 */
  ipcMain.handle('open-new-window', (_event, data) => {
    const newWin = createWindow({
      show: true,
    });

    console.log(data)
    newWin.loadURL(data ?? 'https://baidu.com');

    newWin.webContents.on('dom-ready', () => {
      newWin.webContents.openDevTools();
    });

    newWin.webContents.on('did-finish-load', () => {
      console.log(
        `${colors.green('已打开并加载')} ${colors.red.bold.underline(
          `标题: ${newWin.webContents.getTitle()}`
        )}`
      );
    });

    return true;
  });
}
