// pages/welcome/welcome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 5,
    isLoad: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      time: --that.data.time
    })
    // app.globalData.recommendMessage.length != 0 && 
    // console.log("打印信息开始")
    // console.log(app.globalData);
    // console.log("打印信息结束")
    if (app.globalData.swiperImages.length != 0 && app.globalData.categoryMessage.length != 0 && app.globalData.fourBlock.length != 0) {
      that.setData({
        isLoad: 1
      })
    }

    if (that.data.time == 0) {
      that.setData({
        time: 0
      })

      if (that.data.isLoad != 1) {
        wx.showModal({
          title: '提示',
          content: '网络链接较慢或服务器正在维护中，请稍后重试',
          // content: '加载失败，请稍后重试',
        })
        return
      }
      var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
      // console.log(user)
      if(user.length == 0){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }else{
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
      // wx.switchTab({
      //   url: '/pages/index/index',
      // })
    }
    setTimeout(function() {
      that.onLoad();
      //循环代码
    }, 1000)
  },
  next() {
    let that = this;
    if (that.data.isLoad != 1) {
      wx.showModal({
        title: '提示',
        content: '服务器维护中,请稍后再试',
      })
      clearInterval(this.onLoad());
      that.setData({
        time: 0
      })
      return
    }
    clearInterval(this.onLoad());
    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "京茶吉鹿🦌",
      imageUrl: "/static/images/logo.png"
    }

  }
})