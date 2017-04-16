// pages/my/mynotice/mynotice.js
var AV = require('../../../utils/av-weapp-min.js');
Page({
  data: {
    notices: ['您还没有发布启事']
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var user = AV.User.current();
    var query = new AV.Query('Notice');
    query.equalTo('wxUser', user);
    query.include('wxUser');
    query.find().then(notices =>
      this.setData({
        notices
      })
    ).catch(console.error);
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})