// pages/like/like.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: "我的好友", //导航栏 中间的标题
            height: 0
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,

        currentData: null,
        portrait: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo0JnOqicrn63GG2AQAOTsuFRjV1ibnIlhBjnsYrHcHwfqoicm5PiaON6nEDUwL4R7xT3uY2c9TnhZDSA/132',
        username: '京茶吉鹿🦌',
        introduction: '此人还没有介绍哦',
        isFollow: false,
        isFollow1: true,

        fansList:[],
        attentionList:[],

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

        if(that.data.currentData == 0){
            //调用获取关注的函数
            that.getAttention();
        }else{
            //调用获取粉丝的函数
            that.getFans();
        }
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var information = options.information
        if(information == '粉丝'){
            that.setData({
                currentData: 1
            })
        }else{
            that.setData({
                currentData: 0
            })
        }
        //调用后端（下面函数）
        if(that.data.currentData == 0){
            //调用获取关注的函数
            that.getAttention();
        }else{
            //调用获取粉丝的函数
            that.getFans();
        }
    },
    //获取所有的 关注
    getAttention:function(){
        var that = this;
        var serverUrl = app.serverUrl;
        var id = wx.getStorageSync('userInfo').id
        wx.request({
            url: serverUrl + '/getUserInfo/getAttention?userId=' + id,
            method:'POST',
            success:function(res){
                console.log(res);
                that.setData({
                    attentionList:res.data.data
                })

            }
        })
    },
    //获取所有的 粉丝
    getFans:function(){
        var that = this;
        var serverUrl = app.serverUrl;
        var id = wx.getStorageSync('userInfo').id
        wx.request({
            url: serverUrl + '/getUserInfo/getFans?userId=' + id,
            method:'POST',
            success:function(res){
                console.log(res);
                that.setData({
                    fansList:res.data.data
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