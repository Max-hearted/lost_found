// pages/my/my.js
var AV = require('../../utils/av-weapp-min.js');
Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getUserInfo();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  getUserInfo: function(){
    // 假设已经通过 AV.User.loginWithWeapp() 登录
    // 获得当前登录用户
    var user = AV.User.current();
    // console.log(user);
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({userInfo}) => {
        console.log(userInfo);
        this.setData({
          userInfo: userInfo
        });
        // 更新当前用户的信息
        // user.set(userInfo).save().then(user => {
        //   // 成功，此时可在控制台中看到更新后的用户信息
        //   this.globalData.user = user.toJSON();
        // }).catch(console.error);
      }
    });
  },

  bindSettingTap: function(e){
    wx.openSetting({
      success: (res) => {
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }
        this.onShow();
      }
    });
  }
})