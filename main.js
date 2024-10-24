const { app, BrowserWindow, screen, dialog, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile('dist/pgy-i3-c-expd/browser/index.html');


  // IPC handler for opening directory dialog
  ipcMain.handle('open-directory-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    });
    return result.filePaths; // Returns an array of selected directory paths
  });

  // IPC handler to send process ID to Angular
  ipcMain.handle('get-process-id', async () => {
    return process.pid; // Send Electron's process ID to Angular
  });

  // IPC handler to launch the capture application
  ipcMain.handle('launch-capture-app', async (event, captureAppPath, appServerAddress, captureAppName) => {
    if (!captureAppPath) {
      captureAppPath = "../submoduleslink/Prodigy.CaptureApp/src/Prodigy.CaptureApp/bin/Debug/net6.0/";
    }
    if (!appServerAddress) {
      appServerAddress = '127.0.0.1:5702';
    }

    // captureAppPath = "../submoduleslink/Prodigy.CaptureApp/src/Prodigy.CaptureApp/bin/Debug/net6.0/";
    // appServerAddress='127.0.0.1:5702';
    const command = `Start ${captureAppPath}Prodigy.CaptureApp.exe --name ${captureAppName} --wiretype USB --serveraddress ${appServerAddress}`;
    
    // Execute the external capture application
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error launching capture app: ${error.message}`);
        return { error: error.message };
      }
      if (stderr) {
        console.error(`Capture app stderr: ${stderr}`);
        return { error: stderr };
      }
      console.log(`Capture app stdout: ${stdout}`);
      return { success: true, output: stdout };
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
