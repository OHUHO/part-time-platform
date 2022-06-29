const app = getApp()
Page({
  
  data: {
    currentData : 0,
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    //swiper的高度
    swiperHeight:1000,

    serverUrl:app.serverUrl,
    turnImg:[],
    swiperCurrent:"",  //指示点

    categoryList:[],

    fourBlock:[],

    recommendList:[],

    // topListMessage:[],
    topList0:[],
    topList1:[],

  },

  swiperChange: function (e) {  //指示图标
    this.setData({
      swiperCurrent:e.detail.current
    })
  },
  //跳转到搜索页
  search: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  fourBlock(e){
    var title=e.currentTarget.dataset.value;
    // console.log('值值指')
    // console.log(title)
    wx.navigateTo({
      url: '/pages/fourBlock/fourBlock?title='+title,
    })
  },
  
  onLoad: function (options) {
    // 轮播图
    this.setData(({
      turnImg:app.globalData.swiperImages
    }))

    //五个导航栏
    this.setData({
      categoryList: app.globalData.categoryMessage
    })

    //四个十字分区
    this.setData({
      fourBlock:app.globalData.fourBlock
    })
    
    //推荐优秀学长/学姐
    this.setData({
      recommendList:app.globalData.recommendMessage
    })
    
    //
    this.setData({
      // topListMessage: app.globalData.topListMessage,
      topList0:app.globalData.topList0,
      topList1:app.globalData.topList1
    })
    
    console.log(this.data.topList0)
    console.log(this.data.topList1)
 

  },
  
 
})