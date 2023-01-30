const {app, BrowserWindow} = require('electron');

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            width: 1000,
        height: 1000,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.setMenu(null);
    mainWindow.loadFile('pag1.html');
}

app.whenReady().then(createWindow);
app.allowRendereProcessReuse = true;