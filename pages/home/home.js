// pages/home/home.js
const app = getApp();

let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离

Page({

  data: {
    coverTransform: 'translateY(0)',
    coveTransition: '',
    backgroundImg:'/static/images/bgImg2.jpg',
    avatarUrl:'/static/images/default.png',
    card:'/static/images/vip-card-bg.png',
    nickName:'您还未登录',
    actionSheetItems: ['学长/学姐认证','商家认证'],
    actionSheetHidden: true,
    chooseValue:'',
  },
  onLoad:function (){
    var that = this;
    var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
    wx.showLoading({
      title: '请等待',
    });
    //调用后端
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/user/query?id=' + user.id,
      method:'POST',
      header: {
        'content-type': 'application/json' //默认值
      },
      success:function(res){
        console.log(res);
        wx.hideLoading();
        if(res.data.status == 200){
          var userInfo = res.data.data; //获取从后端传递的数据
          that.setData({ //将数据库中的数据展现在页面上
            avatarUrl:userInfo.portrait,
            nickName:userInfo.username,
            balance:userInfo.balance,
            fans:userInfo.fans,
            attention:userInfo.attention,
            goods:userInfo.good,
          })
        }
      }
    })
  },

  handleTouchStart(event){
    this.setData({
      coveTransition: ''
    })
    // 获取手指起始坐标
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    
    if(moveDistance <= 0){
      return;
    }
    if(moveDistance >= 80){
      moveDistance = 80;
    }
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(){
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },

  //去认证
  listenerButton:function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  listenerActionSheet:function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  choose:function(e){
    this.setData({
      choseValue: e.currentTarget.dataset.value,
      actionSheetHidden: true,
    })
    if(this.data.choseValue == '学长/学姐认证'){
      wx.navigateTo({
        url: '/pages/stu_authentication/stu_authentication',
      })
    }else if (this.data.choseValue == '商家认证') {
      wx.navigateTo({
        url: '/pages/bus_authentication/bus_authentication',
      })
    } 
  },

  //钱包
  wallet(){
    wx.showToast({
      title: '此功能未开通~',
      icon:'none'
    })
  },
  //粉丝和关注
  like:function(e){
    var information = e.currentTarget.dataset.information;
    
    wx.navigateTo({
      url: '/pages/like/like?information=' + information,
    })

  },
  //认证
  authentication: function(){
    
    wx.navigateTo({
      url: '/pages/authentication/authentication',
    })
  },
  //我的兼职发布
  myPartTime:function(){
    wx.navigateTo({
      url: '/pages/myPartTime/myPartTime',
    })
  },
  //我的需求发布
  myDemand:function(){
    wx.navigateTo({
      url: '/pages/myDemand/myDemand',
    })
  },
  //我的咨询
  myConsult:function(){
    wx.showToast({
      title: '功能开发中~',
      icon:'none'
    })
  },

  //联系客服
  call() {
    wx.showModal({
      title: '提示',
      content: '手机联系/微信联系',
      confirmText: "微信联系",
      cancelText: "手机联系",
      confirmColor: "#f6a57f",
      cancelColor: "#f6a57f",
      success: function(e) {
        if (e.confirm) {
          wx.showModal({
            title: '提示',
            content: '微信号：Aubuary',
            confirmText: "复制",
            success: function(e) {
              if (e.confirm) {
          
                wx.setClipboardData({
                  data: 'Aubuary',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '是否联系(15284734517)',
            success: function(e) {
              if (e.confirm) {
                wx.makePhoneCall({
                  phoneNumber: '15284734517',
                })
                
              }
            }
          })
        }
      }
    })
  },
})