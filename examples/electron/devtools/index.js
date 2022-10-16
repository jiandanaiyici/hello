const path = require('path');
const colors = require('colors');

const { app, ipcMain, webContents, BrowserWindow } = require('electron');

const preloadPath = path.join(path.resolve(__dirname, './preload.js'));

let win = null;

const getResourceUrl = (filePath = 'index.html') => {
  return require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: require('path').join(__dirname, filePath),
  });
};

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
      webviewTag: true,
    },
  };
  const innnerWin = new BrowserWindow(defaultOptions);

  innnerWin.once('ready-to-show', () => {
    win.show();
  });
  innnerWin.webContents.on('dom-ready', () => {
    win.webContents.openDevTools();
  });

  innnerWin.on('close', () => {
    if (innnerWin.webContents.isDevToolsOpened()) {
      innnerWin.webContents.closeDevTools();
    }
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
    win.loadURL(getResourceUrl());
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

    console.log(data);
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

  /** 加载 webview 页面 */
  ipcMain.handle('load-webview-page', () => {
    const webviewWin = createWindow({ show: true });
    webviewWin.loadURL(getResourceUrl('webview.html'));
    webviewWin.webContents.on('dom-ready', () => {
      console.log(colors.green('加载完成'));
      webviewWin.webContents.openDevTools();
    });

    return true;
  });

  /** 手动打开 webview 控制台 */
  ipcMain.handle('open-webview-devtools', (_event, targetId) => {
    const target = webContents.fromId(targetId);
    console.log('打开');

    if (!target.isDevToolsOpened() || !target.isDevToolsFocused()) {
      target.openDevTools();
    }
  });

  /** 关闭 webview 控制台 */
  ipcMain.handle('close-webview-devtools', (_event, targetId) => {
    if (targetId !== undefined) {
      const target = webContents.fromId(targetId);
      target.closeDevTools();
    }
  });

  /** 设置控制台内容 */
  ipcMain.handle('setting-devtool-content', (_event, targetId, devtoolsId) => {
    if (targetId && devtoolsId) {
      const target = webContents.fromId(targetId);
      // const devToolContent = webContents.fromId(devtoolsId);
      // const view = new BrowserView();
      // view.webContents.loadURL(getResourceUrl());

      if (!target.isDevToolsOpened() || !target.isDevToolsFocused()) {
        target.openDevTools();
      }

      // 不生效
      // target.setDevToolsWebContents(devToolContent);
    }
  });
}
