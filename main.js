// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('./src/index.html')
  // import css
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, './dist/output.css'), 'utf8'))
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.on('hotspot-event', (event) => {
  event.returnValue = 'Message received!'
  require('electron').shell.openExternal(`https://developer.spotify.com/console/get-users-currently-playing-track`);
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})