// pages/notice/detail/detail.js
var AV = require('../../../utils/av-weapp-min.js');
var noticeStr;

Page({
  // 页面的初始数据
  data: {
    notice: {},
    photoUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   * @param  {[type]} options [description]
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // Do something initialize when page load.
    noticeStr = options.noticeStr;
    var notice = JSON.parse(noticeStr);
    console.log(notice);
    var photoUrl = this.parsePhotoUrl(notice.photoUrl);
    this.setData({
      notice: notice,
      photoUrl: photoUrl
    })
  },

  /**
   * 处理照片url
   * 当URL为空或者为失物招领网站默认图片时，设置为本地默认图片
   * @param  {[type]} photoUrl [description]
   * @return {[type]}          [description]
   */
  parsePhotoUrl: function(photoUrl) {
    if (photoUrl == '' || photoUrl == 'http://www.shiwurenling.com/images/defaultpic.gif') {
      return '../../../images/logo.png';
    }
    return photoUrl;
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // Do something when pull down.
    // wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // Do something when reach bottom.
  },

  /**
   * 用户点击右上角分享
   * @return {[object]} [页面路径与标题]
   */
  onShareAppMessage: function() {
    return {
      title: this.data.notice.title,
      path: '/pages/notice/notice?noticeStr=' + noticeStr,
    };
  },

  /**
   * 点击事件
   * 点击电话号码--拨打电话
   * @param  {[type]} e [event]
   */
  onCall: function(e) {
    var phoneNum = e.currentTarget.dataset.phonenum;
    wx.makePhoneCall({
      phoneNumber: phoneNum,
      success: function(res) {
        console.log(res);
      }
    })
  },

  /**
   * 点击事件
   * 点击图片进行预览
   * @param  {[type]} e [description]
   */
  previewImage: function(e) {
    var current = e.currentTarget.dataset.url;
    if (current == '../../../images/logo.png') {
      wx.showToast({
        title: '本地图片无法预览'
      });
      return;
    }
    wx.previewImage({
      current: current, //当前显示图片的http链接
      urls: [current] //需要预览的图片的http链接表
    });
  },

  /**
   * 点击事件
   * 点击收藏按钮--收藏当前启事到当前用户的我的收藏中
   * @param  {[type]} e [description]
   */
  onClickCollection: function(e) {
    var user = AV.User.current();
    var Collection = AV.Object.extend('Collection');
    var collection = new Collection();
    collection.set('notice', this.data.notice);
    collection.set('wxUser', user);
    collection.save().then(function(collection) {
      // 成功
      console.log(collection);
    }, function(error) {
      // 失败
      console.log(error);
    });
  }
})