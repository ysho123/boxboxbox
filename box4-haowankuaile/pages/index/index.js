var util = require('../../utils/util.js');
var request = require('../../request/request.js');
var app = getApp();
//index.js
//获取应用实例
Page({
  data: {
    
  },

  
 
  onLoad: function () {

  },

  goCreatepage:function(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
    wx.navigateTo({
      url: '../createpage/createpage?type='+this.data.type,
    })
  },
  goOthers:function(e){
    wx.navigateTo({
      url: '../others/others',
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
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
