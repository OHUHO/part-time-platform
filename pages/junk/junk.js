const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '学长/学姐认证', //导航栏 中间的标题
      height: 0
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,

    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:[],//
    labels:[
      {
        'label':'景超',isActive:false,
      },
      {
        'label':'aubuary',isActive:false,
      },
      {
        'label':'哈哈哈',isActive:false,
      },
      {
        'label':'答疑解惑',isActive:false,
      },
      {
        'label':'在线答疑',isActive:false,
      },
      {
        'label':'待定',isActive:false,
      },
    ],
    count:0,
    finalLables:[],
   
  },
  
  // 显示遮罩层
    showModal: function () {
    var that=this;
    that.setData({
      hideModal:false
    })
    var animation = wx.createAnimation({
      duration: 10,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },10)   
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 10,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },10)//先执行下滑动画，再隐藏模块
    
  },

  // 动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 
  clickLabel(e){
    var index = e.currentTarget.dataset.index;
    
    if(this.data.labels[index].isActive){
      this.data.labels[index].isActive = false;//取消选中
      this.data.count --;
    }else{
      this.data.labels[index].isActive = true;//选中
      this.data.count ++;
    }
    if(this.data.count > 3){
      this.data.labels[index].isActive = false;
      this.data.count = 3;
      wx.showToast({
        title: '最多选择三个！',
        icon:'none',
        duration:1000,
      })
    }

    this.setData({
      labels:this.data.labels,
      count:this.data.count,
    })
  },
  //将选中的标签存放起来，并隐藏遮罩层
  confirmLabels(){
    for(var i = 0;i < this.data.labels.length;i++){
      if(this.data.labels[i].isActive){
        this.data.finalLables.push(this.data.labels[i].label)
      }
    }
    this.hideModal();
    console.log(this.data.finalLables);
  }
 
})
