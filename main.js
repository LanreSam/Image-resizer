const path = require('path');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

const { 
    app,
    BrowserWindow,
    Menu
} = require('electron');


//creates the window of the desktop application
const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 500,
        height: 600
    });
    
    //Open devtools
    if (isDev) mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

//creates the about window
const createAboutWindow = () => {
    const aboutWindow = new BrowserWindow({
        title: "Image Resizer",
        width: 300,
        height: 300
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}


//starts the application
app.whenReady().then( () => {
    createMainWindow();

    //Implement Menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    //This block of code checks if a window has not being previously created before.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
    });
});

//Menu template
const menu = [
    ...(isMac) ? [
        {
            label: app.name,
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                }
            ]
        }
    ] : [],
    {
        role: 'fileMenu'
    },
    ...(!isMac) ? [
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                }
            ]
        }
    ] : []
]

//checks for the platform the application is running on.
app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })