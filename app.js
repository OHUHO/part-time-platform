App({
  serverUrl:"http://192.168.1.6:8081",
  globalData: {
    height: 0,
    
    swiperImages:[],
    categoryMessage:[],
    fourBlock:[],
    recommendMessage:[],
    // topListMessage:[],
    topList0:[],
    topList1:[],
    messageDetail: [],
  },

  setGlobalUserInfo:function(user){
    wx.setStorageSync('userInfo', user);
  },
  getGlobalUserInfo:function(user){
    return wx.getStorageSync('userInfo');
  },
  onLaunch() {

    var that = this;

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //自定义顶部搜索必须设置
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })

    /**
     * 获取轮播图
     */
    wx.request({
      url: that.serverUrl + '/getMessage/getSwiper',
      method: "post",
      success: function (e) {
        that.globalData.swiperImages = e.data.data
        // console.log('打印信息1')
        // console.log(e.data.data)
      },
      fail: err => { console.error(err)}
    })
    /**
     * 获取分类
     */
    wx.request({
      url: that.serverUrl + '/getMessage/getCategory',
      method: "post",
      success: function (e) {
        var temp = e.data.data
        that.globalData.categoryMessage = temp.slice(0,5)
        // console.log('打印信息2')
        // console.log(e.data.data)
      },
      fail: err => { console.error(err)}
    })
    /**
     * 获取十字分区 
     */
    wx.request({
      url: that.serverUrl + '/getMessage/getFourBlock',
      method: "post",
      success: function (e) {
        var temp = e.data.data
        that.globalData.fourBlock = temp.slice(0,4)
      },
      fail: err => { console.error(err)}

    })

    /**
     * 获取第一页消息（精心推荐）
     */
    wx.request({
      url: that.serverUrl + '/getMessage/getIndexRecommendMessage',
      method: "post",
      success: function (e) {
        that.globalData.recommendMessage = e.data.data
      },
      fail: err => { console.error(err)}
    })
    /**
     * 获取第一页消息（商家排行榜）
     */
    wx.request({
      url: that.serverUrl + '/getMessage/getIndexTopListMessage',
      method: "post",
      success: function (e) {
        var me = that

        var topListMessage = e.data.data
        console.log(topListMessage)
        for(var i = 0; i < topListMessage.length; i++){
          var type = topListMessage[i].type
          if(type.indexOf("在家做")){
            me.globalData.topList1.push(topListMessage[i])
          }if(type.indexOf("在本地做")){
            me.globalData.topList0.push(topListMessage[i])
          }
        }
      },
      fail: err => { console.error(err)}
    })

  },
  
})


