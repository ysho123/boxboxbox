// pages/qiliang/qiliang.js
var app = getApp();
const LLUtils = require('../utils/LLUtils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    liang_list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    LLUtils.get_user_info(function (res) {
      console.log(res)
      if (res.headimgurl) {
        that.setData({
          openid: res.openid,
          uid: res.uid,
          headimgurl: res.headimgurl,
          nickname: res.nickname
        })
      } else {
        that.setData({
          openid: res.openid,
          uid: res.uid
        })
      }
    })

    getH5IndexInfo.call(that);
  },
  // 获取用户信息
  getUserInfo: function(e){
    var that = this;
    if (!wx.getStorageSync('shows')) {
      var userdata = {
        xid: LLUtils.globalData.xid,
        uid: that.data.uid,
        openid: that.data.openid,
        headimgurl: e.detail.userInfo.avatarUrl,
        nickname: e.detail.userInfo.nickName,
        sex: e.detail.userInfo.gender,
        city: e.detail.userInfo.city,
        country: e.detail.userInfo.country,
        province: e.detail.userInfo.province
      };
      wx.request({
        url: LLUtils.globalData.host + '/user/api/saveuser',
        data: userdata,
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //存入缓存
          wx.setStorageSync(LLUtils.globalData.keyUserInfo, userdata);
          wx.setStorageSync('shows', 1);
          getData.call(that);
          var id = e.target.dataset.id;
          var web_src = e.target.dataset.web_src;
          var title = e.target.dataset.title;
          that.setData({
            id: id
          })
          wx.navigateTo({
            url: '../h5index/h5index?id=' + id + '&title=' + e.target.dataset.title + '&web=' + e.target.dataset.web_src,
          })
        },
        fail: function (res) { }
      })
    }
  },
  todetails: function(e){
    var formid = e.detail.formId;
    LLUtils.saveFormid(formid);

    var id = e.detail.target.dataset.id;
    var web_src = e.detail.target.dataset.web_src;
    var title = e.detail.target.dataset.title;
    this.setData({
      id:id
    })
    if (wx.getStorageSync('shows')) {
      getData.call(this);
      wx.navigateTo({
        url: '../h5index/h5index?id=' + id + '&title=' + e.detail.target.dataset.title + '&web=' + e.detail.target.dataset.web_src,
      })
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

// 数据查看接口
function getData() {
  var that = this;
  wx.request({
    url: LLUtils.globalData.host + '/zb/api/adLog',
    data: {
      openid: that.data.openid,
      appid: that.data.id
    },
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.info(res.data);
    }
  })
}
// 数据内容接口
function getH5IndexInfo() {
  var that = this;
  wx.request({
    url: LLUtils.globalData.host + '/zb/api/getH5IndexInfo',
    data: {
      xcx: 'bgxid' + LLUtils.globalData.xid
    },
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.info(res.data);
      if (res.data.status == 1){
        that.setData({
          liang_list: res.data.data,
          h5_button_text: res.data.data.h5_button_text
        })
        console.log('liang_list:',that.data.liang_list)
        wx.setNavigationBarTitle({
          title: String(that.data.liang_list.title),
        })
      }else{
        // 出现数据错误情况下默认
        wx.setNavigationBarTitle({
          title: '测试活动',
        })
        that.setData({
          h5_button_text:'开始测试'
        })
      }
    }
  })
}