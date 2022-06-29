// pages/home0/home0.js
const app = getApp();
Page({
  data: {
    motto:'京茶吉鹿🦌',
    backgroundImg:'/static/images/login.jpg',
    
  },
  //登录
  login() {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (e) => {
        console.log(e.userInfo)//打印微信端的用户信息
        wx.login({
          success:function(res){
            console.log(res)//打印微信的 code
            //获取登录的临时凭证
            var code = res.code;
            //调用后端，获取微信的session_key,secret
            var serverUrl = app.serverUrl;
            wx.showLoading({
              title: '登录中……',
            })
            // setTimeout(function () {
            //   wx.hideLoading(),
            //   wx.showToast({
            //     title: '登录失败',
            //     icon:'error',
            //   })
            // }, 2000)
            wx.request({
              url:serverUrl+'/wxlogin?code=' + code,
              method:'POST',
              success:function(result){
                console.log(result);//打印后端返回给前端的信息
                wx.request({
                  url: serverUrl+'/userinfo?nickname='+e.userInfo.nickName + '&avatarUrl=' + e.userInfo.avatarUrl,
                  method:'POST',
                  data:{
                    nickName:e.userInfo.nickName,
                    avatarUrl:e.userInfo.avatarUrl
                  },
                  header: {
                    'content-type': 'application/json' //默认值
                  },
                  success:function(res){
                    console.log(res.data);//打印后端接口返回给前端的数据
                    app.setGlobalUserInfo(res.data.data);//保存用户信息到本地缓存，用做拦截器
                    wx.hideLoading({
                      success: (res) => {
                        wx.showToast({
                          title: '登录成功',
                          icon:'success',
                        })
                      },
                    }),
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
    
  },
  //不登录
  noLogin(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }

})