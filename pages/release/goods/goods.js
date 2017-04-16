// pages/release/lostGood/goods/goods.js
var classify_good = ['钱包', '证件', '卡类', '印章', '钥匙', '衣物', '手机', '首饰', '票据',
      '数码', '车牌', '电脑', '包裹', '车辆', '其他'];
var classify_pet = ['狗', '猫', '鸟', '其他'];
var classify_person = ['男', '女'];
Page({
  data: {
    classify: ['钱包', '证件', '卡类', '印章', '钥匙', '衣物', '手机', '首饰', '票据',
      '数码', '车牌', '电脑', '包裹', '车辆', '其他']
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var noticeType = options.noticeType;
    var classify;
    switch(noticeType){
      case '寻物启事':
      case '失物招领':
        classify = classify_good;
        break;
      case '寻宠启事':
        classify = classify_pet;
        break;
      case '寻人启事':
        classify = classify_person;
        break;
    }
    this.setData({
      classify: classify
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindGoodTap: function (e) {
    var idx = e.currentTarget.id;
    var good = this.data.goods[idx];
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      good: good
    })

    wx.navigateBack();
  }
})