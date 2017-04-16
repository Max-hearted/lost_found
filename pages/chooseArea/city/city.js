// pages/chooseArea/chooseCity/chooseCity.js

// 引入腾讯地图sdk
var QQMapWx = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWx({
  key: 'HPNBZ-B426V-CZQPP-UN4R6-QYOF2-MYFU3'
});
var province;
Page({
  data: {
    cityList: []
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var pId = options.pId;
    province = options.province;
    this.getCityList(pId);
  },

  /**
   * 根据省份id获取城市列表
   */
  getCityList: function (pId) {
    var that = this;
    // 调用接口
    qqmapsdk.getDistrictByCityId({
      id: pId, // 对应城市ID
      success: function (res) {
        console.log(res);
        that.setData({
          cityList: res.result[0]
        });
      }
    });
  },

  /**
   * 点击事件----跳转到下一级页面
   */
  bindCityTap: function (e) {
    var cId = e.currentTarget.id;
    var city = e.currentTarget.dataset.city;
    // 跳转到下一级页面
    wx.navigateTo({
      url: '../district/district?province=' + province + '&city=' + city + '&cId=' + cId
    })
  }
})