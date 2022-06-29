// pages/studentDetail/studentDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '学长详情', //导航栏 中间的标题
            height: 0
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,

        studentDetail:{},
        isFollow: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var detail = JSON.parse(options.detail)
        
        that.setData({
            studentDetail:detail
        })
        console.log(that.data.studentDetail)

        var serverUrl = app.serverUrl;
        var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据

        /**
         * 从数据库中判断是否为粉丝
         */
        
        var publisherId = that.data.studentDetail.id;
        var userId = user.id;
        wx.request({
            url: serverUrl + '/user/queryiffan?userId=' + publisherId + '&fanId=' + userId,
            method:'POST',
            header:{
                'content-type': 'application/json',
            },
            success:function(res){
                that.setData({
                    isFollow:res.data
                })
            }
        })
    },

    attention:function(){
        var that = this;

        var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据

        var publisherId = that.data.studentDetail.id;
        var userId = user.id;
        var url = '';

        if(that.data.isFollow){
            //去取消关注
            url = '/user/notbefans?userId=' + publisherId + '&fanId=' + userId;
        }else{
            //去关注
            url = '/user/befans?userId=' + publisherId + '&fanId=' + userId;
        }
        var serverUrl = app.serverUrl;
        wx.request({
            url: serverUrl + url,
            method:'POST',
            header:{
                'content-type': 'application/json',
                'headerUserId':user.id,
                'headerUserToken':user.userToken,
              },
              success:function(res){
                if(that.data.isFollow){
                    that.setData({
                        isFollow:false
                    })
                }else{
                    that.setData({
                        isFollow:true
                    })
                }
              }
          })

    }

})