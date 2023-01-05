let __create = Object.create;
let __defProp = Object.defineProperty;
let __getOwnPropDesc = Object.getOwnPropertyDescriptor;
let __getOwnPropNames = Object.getOwnPropertyNames;
let __getProtoOf = Object.getPrototypeOf;
let __hasOwnProp = Object.prototype.hasOwnProperty;
let __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
                __defProp(to, key, {
                    get: () => from[key],
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
                });
    }
    return to;
};
let __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
        isNodeMode || !mod || !mod.__esModule
            ? __defProp(target, "default", { value: mod, enumerable: true })
            : target,
        mod
    )
);
let import_electron = require("electron");
let import_node_path = __toESM(require("node:path"));
let import_menu = require("./menu");
let import_utils = require("./utils");
const createWindow = (0, import_menu.attchMenuEvent)(function () {
    const win = new import_electron.BrowserWindow({
        width: 900,
        height: 700,
        titleBarStyle: "hidden",
        webPreferences: {
            sandbox: false,
            devTools: true,
            nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: import_node_path.default.resolve(__dirname, "./preload/index.js"),
        },
    });
    if (import_electron.app.isPackaged) {
        win.loadFile("app_dist/index.html");
    } else {
        win.loadURL(`${process.env.VITE_DEV_SERVER_URL}/index.html`);
    }
    import_electron.ipcMain.on("close", () => {
        win.close();
    });
    import_electron.ipcMain.on("changeWindow", (_, type) => {
        if (type === "small") {
            win.hide();
            createSmallBallWindow();
        } else {
            createWindow();
        }
    });
    return win;
});
async function createSmallBallWindow() {
    const winBall = new import_electron.BrowserWindow({
        width: 100,
        height: 100,
        frame: false,
        hasShadow: false,
        transparent: true,
        titleBarStyle: "hidden",
        webPreferences: {
            devTools: true,
            nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: import_node_path.default.resolve(__dirname, "./preload/index.js"),
        },
    });
    if (import_electron.app.isPackaged) {
        winBall.loadFile("dist-app/ball.html");
    } else {
        winBall.loadURL(`${process.env.VITE_DEV_SERVER_URL}/ball.html`);
    }
    let timeId;
    winBall.webContents.on("did-finish-load", () => {
        timeId = setInterval(() => {
            winBall.webContents.send("usage", process.getCPUUsage().percentCPUUsage);
        }, 2e3);
    });
    winBall.on("closed", () => {
        clearInterval(timeId);
    });
}
import_electron.app.on("ready", async () => {
    try {
        await (0, import_utils.installDevTools)(["vue3-devtools"]);
    } catch (e) {
        import_electron.dialog.showErrorBox(
            "\u53D1\u751F\u9519\u8BEF",
            "\u52A0\u8F7Ddevtools\u53D1\u751F\u9519\u8BEF"
        );
    } finally {
        createWindow();
    }
});
import_electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        import_electron.app.quit();
    }
});
