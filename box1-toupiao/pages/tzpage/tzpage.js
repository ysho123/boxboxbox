// pages/others/others.js
var util = require('../../utils/util.js');
var request = require('../../request/request.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.getNewXcx({  }, (data) => {
      console.log(data);
      if (data.code == 1) {
        wx.navigateToMiniProgram({
          appId: data.appid,
          path: data.page,
          extraData: {
            foo: 'bar'
          },
          envVersion: 'release',
          success(res) {
            // 打开成功
          }
        })
      }
    }, null, null)
    var that = this;
    app.get_user_info(function (res) {
      // console.log(res);
      that.setData({
        openid: res.openid,
        userInfo: res
      })
    });
    getOtherXcsInfo.call(that);
  },
  toXcx: function (e) {
    this.setData({
      appid: e.currentTarget.dataset.appid
    })

    wx.navigateToMiniProgram({
      appId: this.data.appid,
      extraData: "bm",
      envVersion: "release",
      success: function () {
        // console.log("跳转成功")
      },
      fail: function () {
        // console.log("跳转失败")
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '投几票',
      path: '/pages/others/others',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
function getOtherXcsInfo() {
  var data = { pstart: this.data.pstart, pend: this.data.pend }
  request.getOtherXcsInfo(data, (data) => {
    console.log(data);
    this.setData({
      xcxlist: data.data
    })
  }, null, null)
}
