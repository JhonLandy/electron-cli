const { app, BrowserWindow } = require('electron')
const devtoolInstall = require("./extensions")


// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

// 打开主窗口
function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({ width: 800, height: 600 })

  // 加载应用的 index.html
  // const indexPageURL = `${__dirname}/app-dist/index.html`;
  const indexPageURL = `http://127.0.0.1:8081`;
  win.loadURL(indexPageURL);

  // 当 window 被关闭，这个事件会被触发
  win.on('closed', () => {
    // 取消引用 window 对象
    win = null
  })
}

// Electron 会在创建浏览器窗口时调用这个函数。
app.on('ready', async () => {
  await devtoolInstall()
  createWindow()
});

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出
  // 否则绝大部分应用会保持激活
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
