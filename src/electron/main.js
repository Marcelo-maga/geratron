import { app, BrowserWindow } from 'electron';

let mainWindow

function createWindow() {
    const isDev = !app.isPackaged;

    mainWindow = new BrowserWindow({
        resizable: false,
        width: 600,
        height: 370,

    });

    mainWindow.removeMenu();

    isDev ? mainWindow.loadURL("http://localhost:5173") : null;

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})