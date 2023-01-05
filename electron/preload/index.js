var import_custom_electron_titlebar = require("custom-electron-titlebar");
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (...args) => import_electron.ipcRenderer.send(...args),
  on: (...args) => import_electron.ipcRenderer.on(...args),
  changeWindow: (type) => import_electron.ipcRenderer.send("changeWindow", type)
});
window.addEventListener("DOMContentLoaded", () => {
  new import_custom_electron_titlebar.Titlebar({
    backgroundColor: import_custom_electron_titlebar.Color.BLACK
  });
});
