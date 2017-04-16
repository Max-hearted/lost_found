// pages/release/release.js
// 引入SDK核心类
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
var app = getApp();
var user;
// 引入腾讯地图sdk
var QQMapWx = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWx({
  key: 'HPNBZ-B426V-CZQPP-UN4R6-QYOF2-MYFU3'
});

Page({
  // 页面的初始数据
  data: {
    noticeTypes: ['寻物启事', '寻宠启事', '寻人启事', '失物招领'],
    noticeType: '寻物启事',
    good: '钱包',
    lostDate: '',
    endDate: '',
    publisher: '请登录',
    photoUrl: '/images/add_img.png',
    region: '' //地区
  },

  /**
   * 生命周期函数--监听页面加载
   * @param  {[type]} options [description]
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // Do something initialize when page load.
    // 初始化丢失日期
    this.initDate();

  },

  /**
   * 初始化时期信息
   * 更新丢失日期和date picker最大日期
   * @return {[type]} [description]
   */
  initDate: function() {
    var myDate = new Date();
    var date = myDate.toLocaleDateString();
    this.setData({
      lostDate: date,
      endDate: date
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 页面渲染完成
    // Do something when page ready.
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // Do something when page show
    // 设置发布人
    this.setPublisher();
    // 设置选择地区
    this.setRegion();
  },

  /**
   * 设置发布人
   */
  setPublisher: function() {
    // 获得当前登录用户
    user = AV.User.current();
    console.log(user);
    // 调用小程序API，得到用户信息,更新发布人
    wx.getUserInfo({
      success: ({
        userInfo
      }) => {
        console.log(userInfo);
        this.setData({
          publisher: userInfo.nickName
        })
      }
    });
  },

  /**
   * 使用腾讯地图sdk获取当前位置信息
   * 更新选择地区数据
   */
  setRegion: function() {
    // 调用接口
    var that = this;
    qqmapsdk.reverseGeocoder({
      success: function(res) {
        console.log(res);
        var location = res.result.ad_info;
        var region = location.province + "-" + location.city + "-" + location.district;
        that.setData({
          region: region
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // Do something when page hide.
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // Do something when page close.
  },

  /**
   * 用户点击右上角分享
   * @return {[object]} [页面路径与标题]
   */
  onShareAppMessage: function() {
    // return custom share data when user share.
    return {
      title: '失物招领ByHeart',
      path: '/pages/release/release'
    };
  },

  /**
   * picker change事件
   * 启事类型发生改变时触发
   * @param  {[type]} e [description]
   */
  bindNoticeChange: function(e) {
    var index = e.detail.value;
    var that = this;
    this.setData({
      noticeType: that.data.noticeTypes[index]
    })
  },

  /**
   * 点击事件
   * 跳转到goods页面，选择失物类别
   * @param  {[type]} e [description]
   */
  bindChooseGoodsTap: function(e) {
    wx.navigateTo({
      url: 'goods/goods?noticeType=' + this.data.noticeType
    })
  },

  /**
   * 点击事件
   * 当用户已经授权登录时，直接return
   * 当用户没有授权登录时，重新调用登录
   * @param  {[type]} e [description]
   */
  bindPublisherTap: function(e) {
    wx.openSetting({
      success: (res) => {
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }
        this.onShow();
      }
    });
  },

  /**
   * picker change事件
   * 丢失日期发生改变时触发
   * @param  {[type]} e [description]
   */
  bindDateChange: function(e) {
    this.setData({
      lostDate: e.detail.value
    })
  },

  /**
   * 点击事件
   * 跳转到chooseArea页面
   * @param  {[type]} e [description]
   */
  bindChooseAreaTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '../chooseArea/chooseArea?region=' + that.data.region,
    });
  },



  /**
   * 点击事件---点击添加图片图标触发
   * 点击选择图片并显示
   * @param  {[type]} e [description]
   */
  bindImageTap: function(e) {
    console.log(new Date());
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(file =>
          // console.log(file.url());
          that.setData({
            photoUrl: file.url()
          })
        ).catch(console.error);
      }
    });
  },

  /**
   * 表单提交
   * 提交表单数据到服务器
   * 成功--跳转到detail页面展示表单数据
   * @param  {[type]} e [description]
   */
  bindSubmit: function(e) {
    console.log(e.detail.value);
    var value = e.detail.value;
    var inputArr = [{
      name: '标题',
      data: value.title
    }, {
      name: '具体地点',
      data: value.lostAddress
    }, {
      name: '失物详情',
      data: value.detail
    }, {
      name: '联系人',
      data: value.contact
    }, {
      name: '联系号码',
      data: value.phoneNum
    }, ];
    // 1.本地非空判定
    for (var i = 0; i < inputArr.length; i++) {
      if (inputArr[i].data == 0) {
        wx.showToast({
          title: inputArr[i].name + '不能为空'
        })
        return;
      }
    }

    // 2.提交数据到服务器
    // 声明一个 Notice 类型
    var Notice = AV.Object.extend('Notice');
    // 新建一个 notice 对象
    var notice = new Notice();
    notice.set("title", inputArr[0].data); //标题
    notice.set("noticeType", this.data.noticeType); //启事类型
    notice.set("classify", this.data.good); //失物类别
    notice.set("publisher", this.data.publisher); //发布人
    notice.set("lostDate", this.data.lostDate); //丢失日期
    notice.set("releaseDate", util.formatDate(new Date())); //丢失日期
    notice.set("lostArea", this.data.region); //丢失地区
    notice.set("lostAddress", inputArr[1].data); //详细地址
    notice.set("detail", inputArr[2].data); //详情
    notice.set("contact", inputArr[3].data); //联系人
    notice.set("phoneNum", inputArr[4].data); //联系电话
    if (this.data.photoUrl == '/images/add_img.png') {
      notice.set("photoUrl", '');
    } else {
      notice.set("photoUrl", this.data.photoUrl); //图片
    }
    notice.set('wxUser', user);
    // 保存数据
    notice.save().then(function(notice) {
      // 成功保存之后，执行其他逻辑.
      console.log('New object created with objectId: ' + notice.id);
      var noticeStr = JSON.stringify(notice);
      wx.navigateTo({
        url: '../notice/detail/detail?noticeStr=' + noticeStr,
        success: function(res) {
          // success
          console.log(res);
        }
      })
    }, function(error) {
      // 异常处理
      if (error.message == 'A unique field was given a value that is already taken.') {
        wx.showToast({
          title: '您已经创建过相同标题的启事，请修改标题内容。'
        });
        console.error('Failed to create new object, with error message: ' + error.message);
      }
    });

  }

})