//app.js

// 获取leanCloud SDK的引用
const AV = require('./utils/av-weapp-min.js');
// 初始化LeanCloud SDK
AV.init({
  appId: 'GTnuelJSboOIIPMsTzd887DQ-gzGzoHsz',
  appKey: 'QWc4fCEnT7ahDxGfVNMWCJkI',
});

App({
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发onLaunch(全局只触发一次)。
   * options
   *   --path String 打开小程序的路径
   *   --query Object 打开小程序的query
   *   --scene Number 打开小程序的场景值
   */
  onLaunch: function(options) {
    // Do something initial when launch.
    console.log('app onLaunch');
    // console.log(options);
    this.login();
  },

  /**
   * 用户登录
   * @return {[type]} [description]
   */
  login: function() {
    // leancloud登录注册
    AV.User.loginWithWeapp().then(user => {
      console.log(user);
      this.globalData.user = user.toJSON();
    }).catch(console.error);
  },

  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发onShow。
   * options
   *   --path String 打开小程序的路径
   *   --query Object 打开小程序的query
   *   --scene Number 打开小程序的场景值
   */
    onShow: function(options) {
    // Do something when show.
    console.log('app onShow');
    // console.log(options);
  },

  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发onHide。
   */
  onHide: function() {
    // Do something when hide.
    console.log('app onHide');
  },

  /**
   * 错误监听函数
   * 当小程序发生脚本错误，或者api调用失败时，
   * 会触发onError并带上错误信息。
   * param msg 错误信息
   */
  onError: function(msg) {
    console.log(msg);
  },

  // 全局变量
  globalData: {
    user: null
  }
})