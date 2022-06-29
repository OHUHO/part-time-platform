// pages/students/students.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: "学长", //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    currentData:0,
    topImg:'/static/images/student_top.png',
    userImg: wx.getStorageSync('userInfo').portrait,
    username: wx.getStorageSync('userInfo').username,
    swiperHeight: 1400,

    //问题 分页的属性
    totalPage:1,
    page:1,
    questionsList:[],
  },
  goRealseQuestions(){
    wx.navigateTo({
      url: '/pages/releaseQuestion/releaseQuestion',
    })
  },

  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
 
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
      that.setData({
        currentData: e.target.dataset.current,
        // swiperHeight:
      })
    }
    // if(this.data.currentData == 0){
    //   that.setData({
    //     swiperHeight:1000,
    //   })
    //   // 发送请求 
      
    // }else if (this.data.currentData == 1) {
    //   // 发送请求
    // } else {
    //   that.setData({
    //     swiperHeight:2000,
    //   })
      
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前的分页数
    var page = that.data.page;
    this.getQuestions(page);
    
  },
  getQuestions:function (page){
    //最新问题发布
    var that = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title:'页面加载中'
    })

    wx.request({
      url: serverUrl + '/getMessage/getQuestions?page=' + page,
      method:'POST',
      success:function(res){
        wx.hideLoading();
        // wx.hideNavigationBarLoading();
        // wx.stopPullDownRefresh();

        //判断当前页是否是第一页，如果不是第一页，那么设置partTimeList为空
        if(page == 1){
          that.setData({
            questionsList:[]
          })
        }
        var questionsList = res.data.data.rows;
        var newQuestionsList = that.data.questionsList;

        that.setData({
          questionsList:newQuestionsList.concat(questionsList),
          page:page,
          totalPage:res.data.data.total,
          
        })
        console.log(that.data.questionsList)
      }
    })
  },

  /**
   * 将此页面的值传递给questionDetail页面 
   */
  transmit:function(e){
    var temp = e.currentTarget.dataset.value
    wx.navigateTo({
      // 转换为String后才能传递,在得到后在转换为对象即可
      url: '/pages/questionsDetail/questionsDetail?temp=' + JSON.stringify(temp),
    })
    
  },

})