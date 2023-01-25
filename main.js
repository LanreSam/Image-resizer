const path = require('path');

const isMac = process.platform === 'darwin';

const { 
    app,
    BrowserWindow
} = require('electron');

//creates the window of the desktop application
const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: 500,
        height: 600
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

//starts the application
app.whenReady().then( () => {
    createMainWindow();

    //This block of code checks if a window has not being previously created before.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
    });
});

//checks for the platform the application is running on.
app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })