// pages/myPartTime/myPartTime.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '我的兼职发布', //导航栏 中间的标题
            height: 0
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,
        partTimeList:[],
  
    },
    //获取wxml页面传递过来的值，设置到data中去
    transmit:function(e){
    
        var temp = e.currentTarget.dataset.value
        wx.navigateTo({
        // 转换为String后才能传递,在得到后在转换为对象即可
        url: '/pages/partTimeDetail/partTimeDetail?temp=' + JSON.stringify(temp),
        })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //获取后端的兼职发布信息
        var serverUrl = app.serverUrl;
        var userId = wx.getStorageSync('userInfo').id
        wx.request({
            url: serverUrl + '/getUserInfo/getMyPartTime?userId=' + userId,
            method:'POST',
            success:function(res){
                that.setData({
                    partTimeList:res.data.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})