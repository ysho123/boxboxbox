// pages/votepage/votepage.js
var util = require('../../utils/util.js');
var request = require('../../request/request.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    finish:false,
    shareBox:true,
    mid:55,
    imageurl:"../../images/userpic.png",
    selectid:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    // console.log("识别小程序码=====", scene);
    if (scene == null || scene == 'undefined'){   
      // console.log()  
      this.setData({
        mid: options.mid
      })
    }else{
      this.setData({
        mid: scene
      })
    }
    getIndexHide.call(this);
    var that = this;
    app.get_user_info(function (res) {
      that.setData({
        openid: res.openid,
        userInfo:res
      });
      getVoteResult.call(that);
    });
  },

  onShow:function(){
  },
  
  onReady:function(){
    
  },
  radioChange:function(e){
    // 选择按钮
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
   
    this.data.selectid[0] = e.detail.value;
    this.setData({
      selectid: this.data.selectid
    }) 
    // console.log('radio发生change事件，携带value值为：', this.data.selectid)  
  },
  checkChange:function(e){
    this.setData({
      selectid: e.detail.value
    }) 
    // console.log('radio发生change事件，携带value值为：', this.data.selectid) 
  },
  bmSubmit:function(e){
    // 提交投票
    this.setData({
      form_id: e.detail.formId
    })
    if (this.data.selectid.length==0){
      wx.showModal({
        title: '提示',
        content: '请至少选择一项',
      })
    }else{
      saveVoteResult.call(this)
    }
    
  },
  shareClick:function(){
    // 分享弹窗
    this.setData({
      shareBox: !this.data.shareBox
    })
  },
  shareBtn:function(){
    // 分享按钮
  
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  pyqClick:function(){
      // 生成朋友圈图片
    this.setData({
      shareBox: !this.data.shareBox
    })
    var pyqImg = this.data.pyqImg
    // console.log(pyqImg);
    wx.previewImage({
      current: pyqImg,// 当前显示图片的http链接
      urls: [pyqImg]// 需要预览的图片http链接列表
    })  
  },
  refreshResult(){
    getVoteResult.call(this);
  },
  ewmClick: function () {
    // 生成二维码
    this.setData({
      shareBox: !this.data.shareBox
    })
    var ewmImg = this.data.ewmImg
    // console.log(ewmImg);
    wx.previewImage({
      current: ewmImg,// 当前显示图片的http链接
      urls: [ewmImg]// 需要预览的图片http链接列表
    })  
  },
  onShareAppMessage: function (res) {
    // 用户点击右上角分享
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)

    }
    return {
      title: that.data.data.title, // 分享标题
      desc: that.data.data.info, // 分享描述
      path: 'pages/votepage/votepage?mid=' + that.data.mid, // 分享路径
      success: function () {
        that.setData({
          shareBox: !that.data.shareBox
        })
      }
    }
  }
})

function getVoteResult(){
  var data = { mid: this.data.mid, openid: this.data.openid }
  request.getVoteResult(data, (data) => {
    // console.log("提交报名",data);
    if (data.status==1){
      var commentlist = data.commentlist;
      for (var i = 0; i < commentlist.length; i++) {
        if (data.totalNum==0){
          data.commentlist[i].widthNum = 0;
        }else{
          var widthNum = parseFloat(commentlist[i].votenum / data.totalNum).toFixed(2);
          data.commentlist[i].widthNum = parseInt(widthNum * 100);
        }       
      }
      this.setData({
        data: data,
        imageurl: data.imageurl,
        title: data.title,
      })
      // console.log(this.data.data)
    }
    
  }, null, () => {
    getQrcode.call(this);
    getPtQrcode.call(this);
  })
}
function saveVoteResult() {
  var data = { selectid: this.data.selectid, openid: this.data.openid, mid: this.data.mid, form_id: this.data.form_id   }
  request.saveVoteResult(data, (data) => {
    console.log(data);
    if (data.status==1){
      this.setData({
        finish:true
      })
      getVoteResult.call(this);
    }
  }, null, null)
}
function getQrcode() {// 获取小程序码
  // var userInfo = wx.getStorageSync('userInfo')
  var data = { para: this.data.mid, title: this.data.title, head: this.data.userInfo.imageurl }
  request.getQrcode(data, (data) => {
    console.log(data);
    if (data.code == 0) {
      this.setData({
        pyqImg: data.imgpath
      })
    }
  }, null, null)
}
function getPtQrcode() {//
  var data = { path: 'pages/votepage/votepage?mid=' + this.data.mid}
  request.getPtQrcode(data, (data) => {
    console.log(data);
    if (data.code == 0) {
      this.setData({
        ewmImg: data.imgpath
      })
    }
  }, null, null)
}
function getIndexHide() {//
  var data = {  }
  request.getIndexHide(data, (data) => {
    console.log(data);

      this.setData({
        xcxHide: data.status
      })
  
  }, null, null)
}
