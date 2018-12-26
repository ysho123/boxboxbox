// pages/mypage/mypage.js
var request = require("../../request/request.js");
var utils = require("../../utils/util.js");
//获取应用实例
var app = getApp()

Page({

   /**
    * 页面的初始数据
    */
   data: {
      add: 1,//显示添加报名
      type: 1,//判断是报名还是发布
      indexData: [],//首页报名内容
      indexData_2: [],//首页发布内容
      openid: '',//获取用户openid
      pstart: 0,//报名页数
      pstart_2: 0,//发布页数
      apply: '',
      access_token: '',//二维码标志
      aa: '',
      captchaImage: '',
      mid:'',//活动id
      show:0,//显示发布空
      show_1:0,//显示参与空
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.setData({
         apply: options.apply || '1'
      })
      var that = this;
      app.get_user_info(function (res) {
        // console.log(res);
        that.setData({
          openid: res.openid
        })
      });
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

      var that = this;
     app.get_user_openid(function (res) {
         that.setData({
            openid: res.openid
         })
         that.setData({
            indexData: [],//首页报名内容
            indexData_2: [],//首页发布内容
            pstart: 0,//报名页数
            pstart_2: 0,//发布页数
         })
         if (that.data.type == 1) {
            getMyVote.call(that);
         } else {
            getMyVote2.call(that);
         }
      });
   },
   //发布
   topLeft: function () {
      if (this.data.type == 2) {
         this.setData({
            indexData: [],
            indexData_2: [],
            pstart: 0,
            pstart_2: 0
         })
         getMyVote.call(this);
         this.setData({
            type: 1,
         })
      }
   },
   //参与
   topRight: function () {
      if (this.data.type == 1) {
         this.setData({
            indexData: [],
            indexData_2: [],
            pstart: 0,
            pstart_2: 0
         })
         getMyVote2.call(this);
         this.setData({
            type: 2,
         })
      }
   },
   //点击内容
   cont: function (e) {
      wx.navigateTo({
         url: '../votepage/votepage?mid=' + e.currentTarget.dataset.id,
      })
   },
   //删除内容
   delete:function(e){
      // console.log(e.currentTarget.dataset.id);
      this.setData({
         mid: e.currentTarget.dataset.id
      })
      deleteMyVote.call(this);
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
      if (this.data.type == 1) {
         this.data.pstart = this.data.pstart + 6;
         getMyVote.call(this);
      } else {
         this.data.pstart_2 = this.data.pstart_2 + 6;
         getMyVote2.call(this);
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function (res) {
     if (res.from === 'button') {
       // 来自页面内转发按钮
       console.log(res.target)
     }
     return {
       title: '投几票',
       path: '/pages/index/index',
       success: function (res) {
         // 转发成功
       },
       fail: function (res) {
         // 转发失败
       }
     }
   }
})

function getMyVote() {
   var data = { openid: this.data.openid, pstart: this.data.pstart, type: 1 };
   request.getMyVote(data, (data) => {
      // console.log(data);
      if (data.status == 1) {
         this.setData({
            indexData: this.data.indexData.concat(data.data),
            add: 1
         })
         if (this.data.indexData == '' || this.data.indexData == null){
            this.setData({
               show:1
            })
         }else{
            this.setData({
               show: 0
            })
         }
        //  console.log(this.data.indexData)
      } else {

      }

   }, null, null)
}

function getMyVote2() {
   var data = { openid: this.data.openid, pstart: this.data.pstart_2, type: 2 };
   request.getMyVote(data, (data) => {
      // console.log(data);
      if (data.status == 1) {
         this.setData({
            indexData_2: this.data.indexData_2.concat(data.data),
            add: 1
         })
         if (this.data.indexData_2 == '' || this.data.indexData_2 == null) {
            this.setData({
               show_1: 1
            })
         } else {
            this.setData({
               show_1: 0
            })
         }
      } else {
      }

   }, null, null)
}

function deleteMyVote(){
   var data = {openid:this.data.openid,mid:this.data.mid}
   request.deleteMyVote(data,(data) => {
      // console.log(data);
      this.setData({
         indexData: [],
         indexData_2: [],
         pstart: 0,
         pstart_2: 0
      })
      getMyVote.call(this);
   },null,null)
}