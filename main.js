const electronOauth2 = require('electron-oauth2');
const {app, BrowserWindow} = require('electron');
const DOOAuth = require('./classes/DOOAuth');
var auth = new DOOAuth();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  win.webContents.openDevTools();

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

  auth.getAccessToken().then(token => {
      // use your token.access_token 
      //console.log("MY TOKEN", token);
      window.webContents.send('token', token);
 
      auth.getRefreshToken(token.refresh_token)
        .then(newToken => {
          //use your new token 
          //console.log("REFRESH TOKEN", newToken);
          window.webContents.send("refresh token", newToken);
        }).catch((err)=>{
            console.log("ERR", err);
        });
    }).catch((err)=>{
        console.log("ERR", err);
    });;
} )

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