// pages/myDemand/myDemand.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '我的需求发布', //导航栏 中间的标题
            height: 0
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,

        demandList:[],
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        var serverUrl = app.serverUrl;
        var userId = wx.getStorageSync('userInfo').id
        wx.showLoading({
            title:'页面加载中'
        })

        wx.request({
            url: serverUrl + '/getUserInfo/getMyDemand?userId=' + userId,
            method:'POST',
            success:function(res){
                wx.hideLoading();
                that.setData({
                    demandList:res.data.data
                })
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