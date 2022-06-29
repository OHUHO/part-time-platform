// components/PartTime/PartTime.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image:{
      type:String,
      value:"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo0JnOqicrn63GG2AQAOTsuFRjV1ibnIlhBjnsYrHcHwfqoicm5PiaON6nEDUwL4R7xT3uY2c9TnhZDSA/132"
    },
    name:{
      type:String,
      value:"冰墩墩专卖店"
    },
    salary:{
      type:String,
      value:"500元/天|日结"
    },
    workType:{
      type:String,
      value:"在本地做"
    },
    creatTime:{
      type:String,
      value:"2022-2-7",
    },
    workAddress:{
      type:String,
      value:"四川省巴中市通江县"
    },
    workTimeBegin:{
      type:String,
      value:"2022-2-8"
    },
    workTimeEnd:{
      type:String,
      value:"2022-2-9"
    },
    peopleNumber:{
      type:String,
      value:0
    },
    partId:{
      type:Number,
      value:null
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 所有的颜色
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"],
    // 随机颜色
    randomColorArr: []
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function(options) {
      
      var that = this,
      // labLen = that.data.labArr.length,
      labLen = 1,
      colorArr = that.data.colorArr,
      colorLen = colorArr.length,
      randomColorArr = [];
      //判断执行
      do{
        let random = colorArr[Math.floor(Math.random() * colorLen)];
        randomColorArr.push(random);
        labLen--;
      } while (labLen > 0)
      
      that.setData({ 
        randomColorArr: randomColorArr
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // details(){
    //   console.log("值值指")
    //   var partTimeDetail = this.data.partTimeDetail
    //   // var partTimeDetail = app.globalData.partTimeDetail
    //   console.log(partTimeDetail)
      
    //   // setTimeout(() => {
    //   //   wx.navigateTo({
    //   //     url: '/pages/partTimeDetail/partTimeDetail?partTimeDetail=' + partTimeDetail
    //   //   })
    //   // }, 3000);
      
    // },
    
  }
  
})
