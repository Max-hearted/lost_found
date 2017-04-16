// pages/chooseArea/chooseArea.js

// 引入腾讯地图sdk
var QQMapWx = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWx({
  key: 'HPNBZ-B426V-CZQPP-UN4R6-QYOF2-MYFU3'
});

Page({
  data: {
    region: '', //定位获取的地区信息
    provinceList: [] // 省份列表
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 获取当前地理位置
    var region = options.region;
    this.setData({
      region: region
    });
    // 获取省级列表
    this.getProvinceList();
  },

  /**
   * 使用腾讯地图sdk获取城市列表
   */
  getProvinceList: function() {
    var that = this;
    try {
      var provinceList = wx.getStorageSync('provinceList');
      if(provinceList){
        that.setData({
          provinceList: provinceList
        })
      }else{
        // 调用接口
        qqmapsdk.getCityList({
          success: function(res) {
            console.log(res);
            var provinceList = res.result[0];
            wx.setStorage({
              key: 'provinceList',
              data: provinceList
            });
            that.setData({
              provinceList: provinceList
            })
          }
        });
      }
    } catch(e){
      console.log(e);
    }
  },

  /**
   * 点击事件
   * 点击当前位置的地区直接返回上一级
   */
  bindLocationTap: function(e) {
    // 更新上一级页面的数据
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var that = this;
    prevPage.setData({
      region: that.data.region
    });

    // 返回上一级页面
    wx.navigateBack();
  },

  /**
   * 点击事件--跳转到下一级页面
   */
  bindProvinceTap: function(e) {
    var pId = e.currentTarget.id;
    var province = e.currentTarget.dataset.province;
    // 跳转到下一级页面
    wx.navigateTo({
      url: 'city/city?province=' + province + '&pId=' + pId
    });
  }
})