const { app, BrowserWindow } = require('electron');
var Promise = require('bluebird');
var getIP = Promise.promisify(require('external-ip')());

/// My Classes
// Config
const config = require('./classes/Config');
// Auth
const DigitalOcean = require('do-wrapper');
const api = new DigitalOcean(config.accessToken, 20);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  win.webContents.openDevTools();

  /*
    api.account().then((data) => {
      console.log(data.body);
    });
  */

  console.log("WINDOE", win.webContents);

  getIP()
    .then((ip) => {
      console.log(`Das IP: ${ip}`);
    })
    .catch((err) => {
      console.log(`Dat Err: ${err}`);
    });

  api.domainRecordsGetAll("codyswartz.us").then((domains) => {
    console.log("DOMAINS", JSON.stringify(domains.body.domain_records, null, "  "));
    //console.log("AN RECORD", domains.body.domain_records[0]);
  })
    .catch((err) => {
      console.log("ERR", err);
    });



  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  var window = createWindow();

})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.