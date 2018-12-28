// pages/h5index/h5index.js
var app = getApp();
const LLUtils = require('../utils/LLUtils.js');
Page({
//阿萨德
  /**
   * 页面的初始数据
   */
  data: {
    allsrc: '',
    web_url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('h5页面options', options)
    var userdata = wx.getStorageSync(LLUtils.globalData.keyUserInfo);
    var nickname = encodeURI(userdata.nickname);
    var weburl = options.web + '?id=' + options.id + '&nickname=' + nickname + '&headimgurl=' + userdata.headimgurl + '&openid=' + userdata.openid + '&xid=' + userdata.xid;
    console.log('weburl:', weburl)
    
    var web_src = decodeURIComponent(options.return_url || encodeURIComponent(weburl))

    this.setData({
      allsrc: web_src,
      title: options.title
    })

    wx.setNavigationBarTitle({
      title: options.title,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    var that = this
    var return_url = options.webViewUrl
    var path = '/pages/index/index'
    console.log(path, options)
    return {
      title: that.data.title,
      path: path,
      success: function (res) {
        that.web_url = return_url
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})