import {
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  app
} from 'electron';

const menu = new Menu()
menu.append(new MenuItem({ role: 'toggleDevTools' }))

app.on('browser-window-created', (event, win) => {
  win.webContents.on('context-menu', (e, params) => {
    menu.popup(win, params.x, params.y)
  })
})

ipcMain.handle('show-context-menu', (event) => {
  // const win = BrowserWindow.fromId(event.frameId)
  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup(win)
})
