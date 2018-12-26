// pages/createpage/createpage.js3
var util = require('../../utils/util.js');
var request = require('../../request/request.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:'',//标题
     instru:'',//补充说明内容
     optionData:[{id:1,value:''}],//添加的选项
     optionVal:0,//点击完成判断选项是否有为空的  0 不为空   1为空
     comment:[],//选项传的内容
     overtime:'',//投票截止时间
     ishidden:0,//是否匿名 1匿名  0 不匿名
     i:2,//添加选项id
     time: '',//时间（某一时间点）
     date: '',//日期
     swithVote:false,
     showContent: '最少要有一个选项',//提示消息内容
     openid:"aabbcc",//用户id
     Concurrent:0,//处理按钮并发
     type:1,
     form_id:'',
     mid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;

      app.get_user_openid(function (res) {
        that.setData({
          openid: res.openid,
        })
      });
    
      that.setData({
         type:options.type
      })
      if(that.data.type == 1){
         wx.setNavigationBarTitle({
            title: '创建单选投票'
         })
      }else{
         wx.setNavigationBarTitle({
            title: '创建多选投票'
         })
      }
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
   this.setData({
      title:'',
      instru:'',
      optionData: [{ id: 1, value: '' }],
      ishidden:0,
      swithVote:false
   })
   var date_1 = new Date();
   var month = date_1.getMonth();
   var day = date_1.getDate() + 1;
   if (month < 9){
      month = '0' + (month+1);
   }else{
      month = month + 1;
   }
   if (day < 10) {
      day = '0' + day;
   }
   this.data.date = date_1.getFullYear() + "-" + month + "-" + day;
   if (date_1.getMinutes() < 10) {
      this.data.time = date_1.getHours() + ":0" + date_1.getMinutes();
   } else {
      this.data.time = date_1.getHours() + ":" + date_1.getMinutes();
   }
   this.setData({
      date: this.data.date,
      time: this.data.time
   })
  },
  //标题
  title:function(e){
     this.setData({
        title:e.detail.value
     })
  },
  //标题市区焦点
  titleBlur:function(e){
     if(this.data.title.trim() == ''){
        this.setData({
           title: this.data.title.trim()
        })
     }
  },
  //补充说明输入
  explainInput:function(e){
     this.setData({
        instru: e.detail.value
     })
  },
  //补充说明市区焦点
  explainBlur:function(e){
    //  console.log(e.detail.value);
     if (this.data.instru.trim() == ''){        
        this.setData({
           instru: this.data.instru.trim()
        })
     }else{
        this.setData({
           instru: e.detail.value
        })
     }      
  },
  //选项input输入
  optionInput:function(e){
    //  console.log(e.currentTarget.dataset.index);
     this.data.optionData[e.currentTarget.dataset.index].value = e.detail.value;
    //  console.log(this.data.optionData);
  },
  //选项失去焦点
   optionBlur:function(e){
      for (var i = 0; i < this.data.optionData.length ; i++ ){
         if (this.data.optionData[i].value.trim() == ''){
            this.data.optionData[i].value = this.data.optionData[i].value.trim();
            this.setData({
               optionData: this.data.optionData
            })
         }  
      }
   },
  //删除选项
  deleteOption:function(e){
    //  console.log(e);
     this.data.optionData.remove(e.currentTarget.dataset.index);
     this.setData({
        optionData: this.data.optionData
     })
  },
  //添加选项
  addOption:function(){
     this.data.optionData.push({id:this.data.i++,value:''});
     this.setData({
        optionData: this.data.optionData
     })
  },
  //选择日期
  bindDateChange:function(e){
     this.setData({
        date:e.detail.value
     })
  },
  //选择某一时间点
  bindTimeChange:function(e){
     this.setData({
        time:e.detail.value
     })
  },
  //匿名投票
  switch1Change:function(e){
    //  console.log(e.detail.value);//fale不匿名  true匿名
     this.setData({
        swithVote:e.detail.value
     })
     if (this.data.swithVote) {
        this.setData({
           ishidden: 1
        })
     } else {
        this.setData({
           ishidden: 0
        })
     }
  },
  //点击完成
  button:function(e){
    //  console.log(e.detail.formId);//formId
     this.setData({
        form_id: e.detail.formId
     })
     if (this.data.title.trim() == '') {
        wx.showModal({
           showCancel: false,
           title: '提示',
           content: '标题不能为空',
        })
     }else  if (this.data.optionData == '' || this.data.optionData == null){
        wx.showModal({
           showCancel: false,
           title: '提示',
           content: '最少要一个选项',
        })
     }else{
        for (var i = 0; i < this.data.optionData.length ; i++){
           if (this.data.optionData[i].value.trim() == '' || this.data.optionData[i].value.trim() == null){
              this.setData({
                 optionVal:1
              })
              wx.showModal({
                 showCancel: false,
                 title: '提示',
                 content: '第' + (i + 1) + '个不能为空',
              })
              
              break;
           }else{
              this.setData({
                 optionVal: 0
              })
           }
        }

        if (this.data.optionVal == 0){
           for (var j = 0; j < this.data.optionData.length; j++){
              this.data.comment.push(this.data.optionData[j].value);
              this.setData({
                 comment: this.data.comment
              })
           }
           if (this.data.Concurrent == 0){
              saveVote.call(this);
           }
           
        }else{
           this.setData({
              comment: []
           })
        }
        // console.log("是否有输出");
     }

     
    //  console.log("投票==" + this.data.title + "补充说明==" + this.data.instru + "选项==" + this.data.comment + this.data.date + " " + this.data.time + "匿名==" + this.data.ishidden);
     
  },


})

function msg(){
   var data = { method: 'sendSatartVote', mid:this.data.mid};
   request.msg(data,(data) => {
      console.log(data);
   },null,null)
}

function saveVote(){
   this.setData({
      Concurrent:1
   })
   var data = { type: this.data.type, title: this.data.title, instru: this.data.instru, comment: this.data.comment, overtime: this.data.date + " " + this.data.time, ishidden: this.data.ishidden, openid: this.data.openid, form_id: this.data.form_id};
   request.saveVote(data,(data) => {
      console.log(data);
      if (data.status==1){
        this.setData({
          Concurrent: 0,
          comment: [],
          mid: data.mid
        })
        msg.call(this);
        wx.redirectTo({
          url: '../votepage/votepage?mid=' + this.data.mid,
        })
      }else{
        wx.showModal({
          title: '提示',
          content: data.msg,
        })
      }
      
   },null,null)
}

