const path = require('path');
const url = require('url');
const { app, screen, ipcMain, BrowserWindow } = require('electron');

const proloadPath = path.join(__dirname, 'preload.js');

function getResource(filePath) {
  return url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, filePath),
  });
}

function createWindow(filePath, { width = 800, height = 600 }) {
  const innnerWin = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    center: true,
    show: false,
    transparent: true,
    webPreferences: {
      preload: proloadPath,
    },
  });

  innnerWin.loadURL(getResource(filePath));

  innnerWin.once('ready-to-show', () => {
    innnerWin.show();
  });

  innnerWin.webContents.on('dom-ready', () => {
    innnerWin.webContents.openDevTools();
  });

  return innnerWin;
}

let win = null;
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {});

  app.on('ready', () => {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    if (!win) {
      win = createWindow('index.html', workAreaSize);
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
      app.quit();
    }
  });
}
