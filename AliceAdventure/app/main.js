const {app, BrowserWindow, ipcMain} = require('electron')

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let welWin, tutWin, mainWin

function createWelWin () {
  // Create the browser window.
  welWin = new BrowserWindow({
  	width: 1280, 
  	height: 720, 
  	frame: true,
    show: false
  });
  welWin.loadURL(url.format({
    pathname: path.join(__dirname, 'Editor/Pages/welcome.html'),
    protocol: 'file:',
    slashes: true,
  }));
  welWin.once('ready-to-show', ()=>{
  	welWin.show();
  });
  welWin.webContents.on('did-finish-load', () => {
	welWin.webContents.send('set-editor', {A: 1, B: ()=>{return 1}});
  });
  welWin.on('closed', ()=>{
  	welWin = null;
  });
}

function createTutWin(){
	tutWin = new BrowserWindow({
	  	width: 1280, 
	  	height: 720,
	  	frame: true,
	    show: false
  	})
  	tutWin.loadURL(url.format({
	    pathname: path.join(__dirname, 'Editor/Pages/tutorial.html'),
	    protocol: 'file:',
	    slashes: true,
  	}));
  	tutWin.once('ready-to-show', ()=>{
  		tutWin.show();
  	});
  	tutWin.on('closed', ()=>{
    	tutWin = null;
  	});
}

function createMainWin(){
  mainWin = new BrowserWindow({
  	width: 1920, 
  	height: 1080,
  	frame: true,
    show: false
  })
  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, 'Editor/Pages/index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  mainWin.once('ready-to-show', ()=>{
  	mainWin.show();
  });
  mainWin.on('closed', ()=>{
    mainWin = null;
  });
}
ipcMain.on('get-editor', (event, data)=>{
	console.log(data);
	if (AliceEditor == null) {
		AliceEditor = data;
	}
	event.returnValue = AliceEditor;
});

ipcMain.on('new-proj', (event, data)=>{
	if (tutWin == null)	createTutWin();
	if (welWin != null) welWin.close();
});

ipcMain.on('open-proj', (event, data)=>{
	if (mainWin == null) createMainWin();
	if (welWin != null) welWin.close();
});

ipcMain.on('complete-tut', (event, data)=>{
	if (mainWin == null) createMainWin();
	if (tutWin != null) tutWin.close();
});	

ipcMain.on('exit', (event, data)=>{
	if (welWin != null) welWin.close();
	if (tutWin != null) tutWin.close();
	if (mainWin != null) mainWin.close();	
});	

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWin)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (welWin === null) {
    createWelWin()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
