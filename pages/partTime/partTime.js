// pages/partTime/partTime.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: "学兼", //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    //学兼 分页的属性
    totalPage:1,
    page:1,
    partTimeList:[],

    // detail:{},

  },
  //获取wxml页面传递过来的值，设置到data中去
  transmit:function(e){
  
    var temp = e.currentTarget.dataset.value
    // app.globalData.partTimeDetail = temp
    // this.setData({
    //   detail:temp,
    // })
    // console.log(this.data.detail)
    wx.navigateTo({
      // 转换为String后才能传递,在得到后在转换为对象即可
      url: '/pages/partTimeDetail/partTimeDetail?temp=' + JSON.stringify(temp),
    })
    
    // console.log(app.globalData.partTimeDetail)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前的分页数
    var page = that.data.page;

    this.getPartTime(page);
  },
  getPartTime:function(page){
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title:'页面加载中'
    })

    wx.request({
      url: serverUrl + '/getMessage/getPartTime?page=' + page,
      method:'POST',
      success:function(res){
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

        //判断当前页是否是第一页，如果不是第一页，那么设置partTimeList为空
        if(page == 1){
          that.setData({
            partTimeList:[]
          })
        }
        var partTimeList = res.data.data.rows;
        var newpartTimeList = that.data.partTimeList;

        that.setData({
          partTimeList:newpartTimeList.concat(partTimeList),
          page:page,
          totalPage:res.data.data.total,
          serverUrl:serverUrl,
          
        })
        // console.log(that.data.partTimeList)
      }
    })
  },
  // 上拉刷新
  onReachBottom:function(){
    var that = this;
    var currentPage = that.data.page;
    var totalPage = that.data.totalPage;
    //判断当前页数和总页数是否相等，如果相等则无需查询
    if(currentPage == totalPage){
      wx.showToast({
        title: '已经没有内容了',
        icon:'none'
      })
      return;
    }
    var page = currentPage + 1;

    that.getPartTime(page);
  },
  //下拉刷新
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    this.getPartTime(1);
  },
  // details(){
  //   wx.navigateTo({
  //     url: '/pages/partTimeDetail/partTimeDetail',
  //   })
  // },

  publish(){
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  }

})