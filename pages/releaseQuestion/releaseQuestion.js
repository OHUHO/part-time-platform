// pages/releaseQuestion/releaseQuestion.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: "提问-京鹿问答", //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    reminder:'问答社区⚠️禁止灌水,请勿发布与问答不相关的问题。问题标签一旦添加完成后不允许更改。',

    focusText:false,
    focusTextArea:false,
    title:'',
    contents:'',
    label:'',
    school:'',
    major:'',
    isLoading: false,
    isGiveMoney:false,
    scrolls: [5,10,50,100],
    idx:0,
    money: 5,
    attention:'注：获得回答后，你需要在问题发布7天后完成采纳，若不进行任何操作，问题酬金将不会给予退还，用于感谢问题回答者',

    isLoadingLabel:true,
    isLoadingLabel_ed:false,
    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:[],//
    labels:[],
    count:0,
    finalLabels:[],
  },
  textOnFocus:function () {
    this.setData({
      focusText:true
    })
  },
  textOffFocus:function (e) {
    this.setData({
      focusText:false
    })
    //设置用户输入的数据
    const {
      name
    } = e.target.dataset
    this.data[name] = e.detail.value
    this.setData(this.data)
  },
  textAreaOnFocus:function () {
    this.setData({
      focusTextArea:true
    })
  },
  textAreaOffFocus:function (e) {
    this.setData({
      focusTextArea:false
    })
    //设置用户输入的数据
    const {
      name
    } = e.target.dataset
    this.data[name] = e.detail.value
    this.setData(this.data)
  },
  goIndex (e) {
    this.setData({
      idx:e.currentTarget.dataset.index,
    })
    this.setData({
      money:this.data.scrolls[this.data.idx]
    })
 },
  //设置用户输入的数据
  setInput: function(e) {
    const {
      name
    } = e.target.dataset
    this.data[name] = e.detail.value
    this.setData(this.data)
  },

  checkboxChange: function (e) {
    this.setData({
      isLoading: !this.data.isLoading
    })
    this.setData({
      isGiveMoney:!this.data.isGiveMoney
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
  clickLabel(e){
    var index = e.currentTarget.dataset.index;
    
    if(this.data.labels[index].isActive){
      this.data.labels[index].isActive = false;//取消选中
      this.data.count --;
    }else{
      this.data.labels[index].isActive = true;//选中
      this.data.count ++;
    }
    if(this.data.count > 3){
      this.data.labels[index].isActive = false;
      this.data.count = 3;
      wx.showToast({
        title: '最多选择三个！',
        icon:'none',
        duration:1000,
      })
    }

    this.setData({
      labels:this.data.labels,
      count:this.data.count,
    })
  },
  //将选中的标签存放起来，并隐藏遮罩层
  confirmLabels(){
    for(var i = 0;i < this.data.labels.length;i++){
      if(this.data.labels[i].isActive){
        this.data.finalLabels.push(this.data.labels[i].label)
      }
    }
    this.hideModal();
    // console.log(this.data.finalLabels);
    // console.log(this.data.animationData)
    
    this.setData({
      isLoadingLabel:false,
      isLoadingLabel_ed:true,
    })
    wx.showToast({
      title: '添加成功',
      icon:'none',
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/getMessage/getQuestionLabel',
      method: "post",
      success: function (e) {
        that.setData({
          labels:e.data.data
        })
        // console.log('打印信息1')
        // console.log(e.data.data)
      }
    })

  },


  submitBtn(){
    if(this.data.title == '' || this.data.contents == '' || this.data.finalLabels.length <=0 || this.data.school == '' || this.data.major == ''){
      wx.showToast({
        title: '信息不完整',
        icon:'error'
      })

    }else{
      var that = this
      var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
      const data = {}
      data.userId = user.id;
      data.portrait = user.portrait;
      data.username = user.username;
      data.title = this.data.title;
      data.contents = this.data.contents;
      data.labelList = JSON.stringify(this.data.finalLabels);
      data.school = this.data.school;
      data.major = this.data.major;
      data.isGiveMoney = this.data.isGiveMoney ? 1:0;
      data.money = this.data.money;
      data.createTime = new Date().getFullYear() + '-'+ (new Date().getMonth()+1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMinutes()
      // console.log(user)
      console.log(JSON.stringify(data)) //打印提交的用户信息

      //调用后端
      var serverUrl = app.serverUrl;
      wx.request({
        url: serverUrl + '/realseQuestion',
        method:'POST',
        data:data,
        header: {
          'content-type': 'application/json',
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '提问成功',
            icon:'success',
            
          })
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/students/students',
            })
        }, 2000)      
          
        }
      })

    }

  },



  

})