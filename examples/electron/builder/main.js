const { app, BrowserWindow } = require('electron');
const path = require('path');

function createBrowserWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  /** 开发模式才会打开 */
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.loadFile(path.resolve(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createBrowserWindow();``

  app.on('activate', () => {
    /** 所有打开的窗口列表 */
    if (BrowserWindow.getAllWindows().length === 0) {
      createBrowserWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit();
  }
});
