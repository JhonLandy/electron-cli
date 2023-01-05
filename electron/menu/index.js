var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  attchMenuEvent: () => attchMenuEvent,
  setApplicationMenu: () => setApplicationMenu
});
module.exports = __toCommonJS(stdin_exports);
var import_main = require("custom-electron-titlebar/main");
var import_electron = require("electron");
import_electron.Menu.setApplicationMenu(null);
const template = [
  {
    label: "\u83DC\u5355demo",
    submenu: [{ label: "demo" }]
  },
  {
    label: "\u770B\u770B",
    submenu: [{ label: "demo1" }, { label: "demo2" }, { label: "demo3" }, { label: "demo4" }]
  }
];
function setApplicationMenu() {
  const menu = import_electron.Menu.buildFromTemplate(template);
  import_electron.Menu.setApplicationMenu(menu);
}
function attchMenuEvent(callback) {
  (0, import_main.setupTitlebar)();
  return () => {
    const browserWindow = callback();
    if (browserWindow) {
      (0, import_main.attachTitlebarToWindow)(browserWindow);
    }
  };
}
setApplicationMenu();
