// pages/partTimeDetail/partTimeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: "兼职详情", //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    background:'../../static/images/beijing.png',

    partTimeDetail:{},

    contents:'',
    contentShow:'', // 真实显示的内容
    maxLength: 106, // 收起时最大显示文字长度
    ellipsis: true, // 是否收缩

    businessName:'景超'

  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      //将String转换为Object
      partTimeDetail:JSON.parse(options.temp),
      //下面的写法不正确（因为设置数据是同时发生，如果数据之间有关联，需要按照时间先后来设置）
      // contents:this.data.partTimeDetail.workContent,
      // contentShow:this.data.partTimeDetail.workContent.substring(0,1),
      
    })
    this.setData({
      contents:this.data.partTimeDetail.workContent,
      contentShow:this.data.partTimeDetail.workContent.substring(0,106),
    })
    // console.log(this.data.partTimeDetail)
    // console.log(this.data.contents)
    // console.log(this.data.contentShow)
    console.log(this.data.partTimeDetail)

    var businessId = this.data.partTimeDetail.businessId;
    // console.log('商家的id')
    // console.log(businessId)
    wx.request({
      url: app.serverUrl + '/getBusinessInfo/getBussinessName?id=' + businessId,
      method:'POST',
      success:function(res){
        // console.log(res.data.data)
        that.setData({
          businessName:res.data.data
        })
        
      }
    })
    
  },
  reminder(){
    wx.showToast({
      title: '未定义...',
      icon:'none'
    })
  },
  contact(e){
    wx.showModal({
      title: '提示',
      // content: '是否联系（' + e.target.id + "）",
      content: '是否联系 15284734517',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#faa680',
      success: (result) => {
        if (result.confirm) {
          wx.makePhoneCall({
            // phoneNumber: e.target.id,
            phoneNumber: '15284734517',
          })
        }
      },
    });
  },
 
  confirm(){
    var that = this;
    var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
    wx.showModal({
      cancelColor: '#faa680',
      title:'确认报名',
      content:that.data.partTimeDetail.name,
      
      success (res) {
        
        var userId = user.id;
        var partTimeId = that.data.partTimeDetail.id;
        if (res.confirm) {
          //向后端发送请求，然后提示用户
          wx.request({
            url: app.serverUrl + '/partTimeAbout/addNumber?partTimeId=' + partTimeId + '&userId=' + userId,
            method:'POST',
            header:{
              'content-type': 'application/json',
            },
            success:function(res){
              console.log(res)
              wx.showToast({
                title: '报名成功!',
                icon:'success'
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '../../pages/partTime/partTime',
                })
              }, 2000);
            }

          })
         
          
          
        } else if (res.cancel) {
          
        }
      }
    })
  },

  ellipsis: function () {
    var ellipsis = !this.data.ellipsis;
    var contentShow = this.data.contents;
    var maxLength = this.data.maxLength;
    // 如果内容长度少于106，则不截取;否则当处于收起状态，截取103个文字并加上省略号
    contentShow = (contentShow.length > maxLength && ellipsis) ? contentShow.substring(0, maxLength - 3) + "..." : contentShow;
    this.setData({
      contentShow: contentShow,
      ellipsis: ellipsis
    })
  },

  


})