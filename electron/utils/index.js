var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  installDevTools: () => installDevTools,
  resolveAppPath: () => resolveAppPath
});
module.exports = __toCommonJS(stdin_exports);
var import_node_path = __toESM(require("node:path"));
var import_node_url = __toESM(require("node:url"));
var import_electron = require("electron");
function resolveAppPath(resource) {
  return import_node_url.default.pathToFileURL(import_node_path.default.join(`${import_electron.app.getAppPath()}/resources/app.asar`, resource)).href;
}
function installDevTools(devtools) {
  if (import_electron.app.isPackaged) {
    return Promise.resolve();
  }
  return Promise.all(
    devtools.map((name) => {
      return import_electron.session.defaultSession.loadExtension(
        import_node_path.default.resolve(__dirname, `../../extensions/${name}`)
      );
    })
  );
}
