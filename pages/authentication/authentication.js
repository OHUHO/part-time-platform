// pages/authentication/authentication.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      nvabarData: {
          showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
          title: '我的认证', //导航栏 中间的标题
          height: 0
      },
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,


      userAuthentication:[],
      portrait:'',
      username:'',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;

      //获取用户信息
      var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据

      that.setData({
        portrait:user.portrait,
        username:user.username
      })

      //判断用户是否进行了某种认证
      
      var serverUrl = app.serverUrl;
      var id = wx.getStorageSync('userInfo').id
      wx.request({
          url: serverUrl + '/getUserInfo/getAuthentication?userId=' + id,
          method:'POST',
          success:function(res){
              console.log(res);
              that.setData({
                  userAuthentication:res.data.data
              })

          }
      })

    },
    goAuth(){
        wx.showModal({
          
            title: '提示',
            content: '请选择认证方式',
            confirmText: "学生认证",
            cancelText: "商家认证",
            confirmColor: "#f6a57f",
            cancelColor: "#f6a57f",
            success: function(e) {
                if (e.confirm) {
                    wx.showModal({
                      title: '提示',
                      content: '您正在进行学长/学姐认证',
                      success: function(e) {
                        if (e.confirm) {
                            wx.navigateTo({
                              url: '/pages/stu_authentication/stu_authentication',
                            })
                        }
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '您正在进行商家认证',
                      success: function(e) {
                        if (e.confirm) {
                            wx.navigateTo({
                              url: '/pages/bus_authentication/bus_authentication',
                            })
                        }
                      }
                    })
                  }
                
            }
            
        })
    },
    
})