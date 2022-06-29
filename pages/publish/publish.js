// pages/release/release.js
const app = getApp()
Page({

  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: "发布兼职", //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    
    name:'',
    content:'',
    salary:'',
    scrolls0: ['小时','天','周','月','次'],
    idx0: 1,
    scrolls1:['日结','周结','月结','完工结'],
    idx1:0,
    array1:['在家做','在本地做'],
    classify:0,
    date: new Date().getFullYear() + '-'+ (new Date().getMonth()+1) + '-' + new Date().getDate(),//默认起始时间 
    date2: new Date().getFullYear() + '-'+ (new Date().getMonth()+1) + '-' + new Date().getDate(),//默认结束时间 
    number: '',
    array2:['男','女','不限'],
    sex: 2,
    regionA: ["四川省", "巴中市", "通江县"],
    regionB:'',
  },
  //选择 小时、天、周、月、次
  goIndex0 (e) {
     this.setData({
       idx0:e.currentTarget.dataset.index,
     })
  },
  //选择结算方式
  goIndex1 (e) {
    this.setData({
      idx1:e.currentTarget.dataset.index,
    })
 },
  // 开始时间的选择  
  bindDateChange(e) {
    let that = this;
    that.setData({
      date: e.detail.value,
    })
  },
  //结束时间的选择
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
    })
  },
  //兼职分类
  bindPickerChange1: function(e) {
    this.setData({
      classify: e.detail.value
    })
  },
  //性别要求
  bindPickerChange2: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  // 选择省市区
  changeRegion(e){
    this.setData({ 
      regionA: e.detail.value 
    });
  },
  //设置用户输入的数据
  setInput: function(e) {
    const {
      name
    } = e.target.dataset
    this.data[name] = e.detail.value
    this.setData(this.data)
  },



  submitBtn(){
    if(this.data.name == '' || this.data.salary == '' || this.data.number == '' ||
    this.data.content == ''){
      wx.showToast({
        title: '信息不完整',
        icon:'error',
      })
    }else{
      var that = this
      var user = wx.getStorageSync('userInfo');//获取缓存在本地的用户数据
      const data = {}
      data.businessId = user.id;
      data.portrait = user.portrait;
      data.name = this.data.name;
      data.classify = this.data.array1[this.data.classify];
      data.salary = this.data.salary;
      data.salaryType = this.data.scrolls0[this.data.idx0];
      data.clearingForm = this.data.scrolls1[this.data.idx1];
      data.address = this.data.regionA +','+ this.data.regionB;
      data.sexRequirement = this.data.array2[this.data.sex];
      data.peopleNumber = this.data.number;
      data.workHoursBegin = this.data.date + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMinutes();
      data.workHoursEnd = this.data.date2 + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMinutes();
      data.workContent = this.data.content;
      data.creatDate = new Date().getFullYear() + '-'+ (new Date().getMonth()+1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMinutes()
      // console.log(JSON.stringify(data)) //打印提交的用户信息

      //调用后端
      var serverUrl = app.serverUrl;
      wx.request({
        url: serverUrl + '/partTimeAbout/publish',
        method:'POST',
        data:data,
        header: {
          'content-type': 'application/json',
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '发布成功',
            icon:'success',
            
          })
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }, 2000)      
          
        }
      })

    }


  }
 

})