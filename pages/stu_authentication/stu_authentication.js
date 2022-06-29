const app = getApp()
Page({
  
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '学长/学姐认证', //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    array1: ['男', '女'],
    array2:['在读','在职','其他'],
    array3:['学生证','身份证','其他'],
    name: '',
    gender: 0,
    phone: '',
    state: 0,
    school:'',
    papers_type: 0,
    papers_id: '',
    imageList: [],
    Tips:'温馨提示：请按上面的提示输入真实信息！',
    instructionBook: '同意《京茶吉鹿🦌协议》',
    radioCheck:false,
  },
  
  // resetData: function() {
  //   this.setData({
  //     imageList: [],
  //   });
  // },

  //性别选择
  bindPickerChange1: function(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  //状态选择
  bindPickerChange2: function(e) {
    this.setData({
      state: e.detail.value
    })
  },
  //证件类型选择
  bindPickerChange3: function(e) {
    this.setData({
      papers_type: e.detail.value
    })
  },
  //上传图片
  uploadImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const imageList = this.data.imageList.concat(res.tempFilePaths)
        // 最多能上传1张照片
        const imageList1 = imageList.length <= 1 ? imageList : imageList.slice(0, 1)
        this.setData({
          imageList: imageList1
        })
        if(imageList.length > 1){
          wx.showToast({
            title: '只允许上传1张图片',
            icon:'none',
          })
          return
        };
      }
    })
  },
  //移除图片
  removeImage(e) {
    var that = this;
    var imageList = that.data.imageList;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    imageList.splice(idx,1)
    this.setData({
      imageList: imageList
    })
  },
  //预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const imageList = this.data.imageList
    wx.previewImage({
      current: imageList[idx],  //当前预览的图片
      urls: imageList,  //所有要预览的图片
    })
  },
  
  //同意协议
  radioClick:function(event){
    var radioCheck = this.data.radioCheck;
    this.setData({ "radioCheck": !radioCheck});
  },

  //设置用户输入的数据
  setInput: function(e) {
    const {
      name
    } = e.target.dataset
    this.data[name] = e.detail.value
    this.setData(this.data)
  },

  //提交信息
  submitBtn(){
    if(! this.data.radioCheck){
      wx.showToast({
        title: '未同意协议',
        icon:'error',
      })
    }else if (this.data.name == '' || this.data.phone == '' || this.data.papers_id == '' || this.data.imageList.length != 1 || this.data.school == '') {
      wx.showToast({
        title: '信息不完整',
        icon:'error',
      })
    } else {
      var that = this
      var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
      const data = {}
      data.id = user.id
      data.name = this.data.name
      data.gender = this.data.array1[this.data.gender]
      data.phone = this.data.phone
      data.school = this.data.school
      data.state = this.data.array2[this.data.state]
      data.papersType = this.data.array3[this.data.papers_type]
      data.papersId = this.data.papers_id
      data.creatDate = new Date().getFullYear() + '-'+ new Date().getMonth()+1 + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMinutes()
      // data.papersImg = this.data.imageList.shift()
      // console.log(JSON.stringify(data)) //打印提交的用户信息
      //调用后端
      var serverUrl = app.serverUrl;
      wx.request({
        url: serverUrl + '/auth/stu_auth',
        method:'POST',
        data:data,
        header: {
          'content-type': 'application/json',
        },
        success:function(res){
          console.log(res);
          var me = that
          wx.uploadFile({
            url: serverUrl + '/auth/stu_img?id=' + user.id,
            filePath: that.data.imageList[0],
            name: 'file',
            header: {
              'content-type': 'application/json',
            },
            success (res){
              console.log(res)
            }
          })
          wx.showToast({
            title: '提交成功',
            icon:'success',
          })
          wx.switchTab({
            url: '/pages/home/home',
          })
        },
        fail:function(){
          wx.showToast({
            title: '提交失败',
            icon:'error'
          })
          console.log(error)
        }
      })
    }
  },

})
