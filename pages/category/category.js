// pages/category/category.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '', //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    title: '',


  },

  onLoad: function (options) {
    console.log('今天见鬼，cw')
    console.log(options.title)
    var that = this;
    that.setData({
      nvabarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: options.title, //导航栏 中间的标题
        height: 0
      },
    })
    // that.setData({
    //   title: options.title
    // })
    
  //   /**
  //    * 通过 title 来判断发送请求的 url 地址
  //    */
  //   var title = that.data.title;
    
  //   var classify = '';
  //   if(title == "在线兼职"){
  //     classify = '在家做'
  //   }
  //   if(title == "本地兼职"){
  //     classify = '在本地做'
  //   }
  //   if(title == "周末兼职"){
  //     classify = '周末做'
  //   }
  //   if(title == "高薪工作"){
  //     classify = '高薪兼职'
  //   }
  //   console.log(classify)
  //   console.log(title)
  //   /**
  //    * 从数据库中去获取优秀商家发布的历史兼职情况
  //    */
  //   var serverUrl = app.serverUrl;
  //   wx.request({
  //       url: serverUrl + '/getPartTime/getCategory?classify=' + classify,
  //       method:'POST',
  //       success:function(res){
  //           console.log(res.data.data)
  //           that.setData({
  //               partTimeList: res.data.data
  //           })
  //       }
  //   })


  },

  
})