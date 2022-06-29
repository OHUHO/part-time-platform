// pages/questionsDetail/questionsDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        nvabarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: "问题详情", //导航栏 中间的标题
        height: 0
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,

        questionDetail:{},

        isGood:false,
        allAnswerNum: 0,

        hideModal:true, //模态框的状态  true-隐藏  false-显示
        animationData:[],//
        isAutoFocus: false,
        answerContents: '',

        commentsList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      this.setData({
      //将String转换为Object
      questionDetail:JSON.parse(options.temp),
      })
      var questionId = this.data.questionDetail.id;
      console.log(questionId);
      this.getQuestionsAbout();

    },
    
    goods(){
        this.setData({
            isGood: !this.data.isGood
        })
    },

    writeAnswer(){
        this.showModal()
        this.setData({
            isAutoFocus: true
        })
    },

    // 显示遮罩层
    showModal: function () {
    var that=this;
    that.setData({
      hideModal:false
    })
    var animation = wx.createAnimation({
      duration: 10,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },10)   
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 10,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },10)//先执行下滑动画，再隐藏模块
    
  },

  // 动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 

  setInput:function(e){
    //设置用户输入的数据
    const {
      name
    } = e.target.dataset
    this.data[name] = e.detail.value
    this.setData(this.data)
    
  },

  comment(){
    
    if(this.data.answerContents == ''){
      wx.showToast({
        title: '内容不能为空',
        icon: 'error'
      })
    }else{
      //得到问题的id，并将信息返回给后端进行保存

      var that = this
      var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
      const data = {}

      data.messageId = this.data.questionDetail.id;
      data.userId = user.id;
      data.username = user.username;
      data.portrait = user.portrait;
      data.commentDetail = this.data.answerContents;
      data.creatTime = new Date().getFullYear() + '-'+ (new Date().getMonth()+1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMinutes()
      // console.log(user)
      console.log(JSON.stringify(data)) //打印提交的用户信息

      var serverUrl = app.serverUrl;
      wx.request({
        url: serverUrl + '/questionsComment/comments',
        method:'POST',
        data:data,
        header: {
          'content-type': 'application/json',
        },
        success:function(res){
          var me = that;
          console.log(res);
          me.hideModal();
          wx.showToast({
            title: '发布成功',
            icon:'success',
            
          })
          //发布成功后，重新从数据库中去获取数据（刷新操作）
          // var questionId = me.data.questionDetail.id;
          me.getQuestionsAbout();
        }
      })
      
    }
  },

  /**
   * 获取页面的所有关于问题的信息
   */
  getQuestionsAbout:function(){
    var that = this
    var serverUrl = app.serverUrl;
    var questionId = that.data.questionDetail.id;
    wx.request({
      url: serverUrl + '/getQuestionsAbout?questionId=' + questionId,
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success:function(res){
        // console.log("我是questionDetail页面的打印信息")
        console.log(res.data.data)
        that.setData({
          commentsList: res.data.data,
        })
        that.setData({
          allAnswerNum: that.data.commentsList.length
        })
      }
    })

  }

})
