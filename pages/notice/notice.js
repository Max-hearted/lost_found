// pages/notice/notice.js
const AV = require('../../utils/av-weapp-min.js');
const util = require('../../utils/util.js');
var page = 1; //页码
// 数据类型
var DATATYPE = {
  XUNWU: '寻物启事',
  XUNCHONG: '寻宠启事',
  XUNREN: '寻人启事',
  ZHAOLING: '失物招领'
};

Page({
  // 页面的初始数据
  data: {
    topTabItems: ['寻物启事', '寻宠启事', '寻人启事', '失物招领'], //顶部导航条
    currentTopItem: 0, //导航条index
    notices_good: [], //启事列表--寻物
    notices_pet: [], //启事列表--寻宠
    notices_person: [], //启事列表--寻人
    notices_claim: [], //启事列表--招领
  },

  /**
   * 生命周期函数--监听页面加载
   * @param  {[type]} options [description]
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // Do something initialize when page load.
    this.refreshNewData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 页面渲染完成
    // Do something when page ready.
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          swiperHeight: (res.windowHeight - 37)
        })
      }
    })
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
    // return custom share data when user share.
    return {
      title: '失物招领ByHeart',
      path: '/pages/notice/notice'
    };
  },

  /**
   * 切换顶部标签
   */
  switchTab: function(e) {
    var currentTopItem = e.currentTarget.dataset.idx;
    this.setData({
      currentTopItem: currentTopItem
    });
    //如果需要加载数据
    if (this.needLoadNewDataAfterSwiper()) {
      this.refreshNewData();
    }
  },

  /**
   * 左右滑动swiper时顶部标签跟着改变
   */
  bindChange: function(e) {
    this.setData({
      currentTopItem: e.detail.current
    });
    //如果需要加载数据
    if (this.needLoadNewDataAfterSwiper()) {
      this.refreshNewData();
    }
  },

  /**
   * 刷新数据
   * 首次加载或重新打开界面或下拉刷新时调用
   */
  refreshNewData: function() {
    // 加载提示框
    util.showLoading();
    var that = this;
    var noticeType = this.data.topTabItems[this.data.currentTopItem];
    this.getNoticesByType(noticeType, 1, function(notices) {
      that.setNewDataWithRes(notices, that);
      setTimeout(function() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }, 1000);
    })
  },


  /**
   * 监听用户下拉动作
   */
  refreshData: function() {
    this.refreshNewData();
  },

  /**
   * 滚动后需不要加载数据
   * @return {[boolean]} [true加载数据，false不加载]
   */
  needLoadNewDataAfterSwiper: function() {
    switch (this.data.topTabItems[this.data.currentTopItem]) {
      //寻物
      case DATATYPE.XUNWU:
        return this.data.notices_good.length > 0 ? false : true;
        //寻宠
      case DATATYPE.XUNCHONG:
        return this.data.notices_pet.length > 0 ? false : true;
        //寻人
      case DATATYPE.XUNREN:
        return this.data.notices_person.length > 0 ? false : true;
        //招领
      case DATATYPE.ZHAOLING:
        return this.data.notices_claim.length > 0 ? false : true;
      default:
        break;
    }
    return false;
  },

  /**
   * 设置新数据
   * @param {[type]} notices [启事列表]
   * @param {[type]} target [that]
   */
  setNewDataWithRes: function(notices, target) {
    switch (this.data.topTabItems[this.data.currentTopItem]) {
      // 寻物
      case DATATYPE.XUNWU:
        target.setData({
          notices_good: notices
        });
        break;
        // 寻宠
      case DATATYPE.XUNCHONG:
        target.setData({
          notices_pet: notices
        });
        break;
        // 寻人
      case DATATYPE.XUNREN:
        target.setData({
          notices_person: notices
        });
        break;
        // 招领
      case DATATYPE.ZHAOLING:
        target.setData({
          notices_claim: notices
        });
        break;
      default:
        break;
    }
  },

  /**
   * 从LeanCloud服务器获取启事信息
   * @param  {[type]}   noticeType [启事类型]
   * @param  {Function} success   [回调函数，参数为启事信息]
   */
  getNoticesByType: function(noticeType, page=1, success) {
    var query = new AV.Query('Notice');
    query.descending('releaseDate');
    query.limit(10 + page * 10);
    query.equalTo('noticeType', noticeType);
    query.find().then(function(notices) {
      // console.log(notices);
      success(notices);
    }, function(error) {
      console.log(error);
    });
  },

  /**
   * 上拉加载更多
   */
  loadMoreData: function() {
    console.log("加载更多");
    util.showLoading();
    var that = this;
    var noticeType = this.data.topTabItems[this.data.currentTopItem];
    this.getNoticesByType(noticeType, page, function(notices){
      page++;
      that.setNewDataWithRes(notices, that);
      setTimeout(function() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }, 1000);
    });
  },

  /**
   * 点击事件--点击item跳转到详情页
   * @param  {[type]} e [event事件]
   */
  onClickItem: function(e) {
    console.log(e);
    var notice = e.currentTarget.dataset.notice;
    var noticeStr = JSON.stringify(notice);
    wx.navigateTo({
      url: 'detail/detail?noticeStr=' + noticeStr,
      success: function(res) {
        // success
        console.log(res);
      },
      fail: function(res) {
        // fail
        console.log(res);
      },
      complete: function(res) {
        // complete
        console.log(res);
      }
    })
  },


})