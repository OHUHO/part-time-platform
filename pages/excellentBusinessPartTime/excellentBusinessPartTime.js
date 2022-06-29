// pages/excellentBusinessPartTime/excellentBusinessPartTime.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: 'TA的兼职', //导航栏 中间的标题
            height: 0
        },
        // 此页面 页面内容距最顶部的距离
        height: app.globalData.height * 2 + 20,

        serverUrl:app.serverUrl,
        detail:{},
        /*
        detail:{
            basicInformation: "个性鲜明，陈旧余香",
            id: "49857636",
            motto: "有个性，就最好",
            name: "小犟驴",
            portrait: "/Administrator/ExcellentBusinessTopList/6.jpg",
            selfIntroduction: "本店所有的商品照片为专业摄影师拍摄，后期精心修制及色彩调整，尽量与实际商品持续一致，但由于拍摄时用光、角度、显示器色彩偏差、个人对色彩的认知等方面的差异，导致实物可能会与照片存在一些色差，最终色彩以实际商品为准。请在购买前与我们客服充分沟通后做出慎重选取。色差问题将不被我们认可当退换货的理由！",
            type: "在本地做",
        },
        */
        partTimeList:{},

    },

    //获取wxml页面传递过来的值，设置到data中去
    transmit:function(e){
    
        var temp = e.currentTarget.dataset.value
        wx.navigateTo({
        // 转换为String后才能传递,在得到后在转换为对象即可
        url: '/pages/partTimeDetail/partTimeDetail?temp=' + JSON.stringify(temp),
        })
        // console.log(app.globalData.partTimeDetail)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        that.setData({
            detail: JSON.parse(options.detail)
        })
        console.log(that.data.detail)

        var excellentBusinessId = that.data.detail.id;
        /**
         * 从数据库中去获取优秀商家发布的历史兼职情况
         */
        var serverUrl = app.serverUrl;
        wx.request({
            url: serverUrl + '/getBusinessInfo/getExcellentBusinessPartTime?businessId=' + excellentBusinessId,
            method:'POST',
            success:function(res){
                console.log(res.data.data)
                that.setData({
                    partTimeList: res.data.data
                })
            }
        })
    },


})