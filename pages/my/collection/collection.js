// pages/my/collection/collection.js
var AV = require('../../../utils/av-weapp-min.js');
Page({
  data:{
    collections: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var user = AV.User.current();
    var query = new AV.Query('Collection');
    query.equalTo('wxUser', user);
    query.include('wxUser');
    query.find().then(collections =>
      this.setData({
        collections
      })
    ).catch(console.error);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})