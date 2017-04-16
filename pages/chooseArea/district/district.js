// pages/chooseArea/chooseDistrict/chooseDistrict.js
// 引入腾讯地图sdk
var QQMapWx = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWx({
  key: 'HPNBZ-B426V-CZQPP-UN4R6-QYOF2-MYFU3'
});
var province, city;
Page({
  data: {
    areaList: []
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var cId = options.cId;
    province = options.province;
    city = options.city;
    this.getDistrictList(cId);
  },

  /**
   * 根据城市id获取区街道列表
   */
  getDistrictList: function(cId) {
    var that = this;
    // 调用接口
    qqmapsdk.getDistrictByCityId({
      id: cId, // 对应城市ID
      success: function(res) {
        console.log(res);
        that.setData({
          areaList: res.result[0]
        })
      }
    });
  },

  bindAreaTap: function(e) {
    var aId = e.currentTarget.id;
    var district = e.currentTarget.dataset.district;
    var region = province + "-" + city + "-" + district;
    // 更新数据（上三级页面的数据）
    var pages = getCurrentPages();
    var upThreePage = pages[pages.length - 4];
    var provinceList = getApp().globalData.provinceList;
    upThreePage.setData({
      region: region
    });

    // 返回到上三级页面
    wx.navigateBack({
      delta: 3
    })
  }
})