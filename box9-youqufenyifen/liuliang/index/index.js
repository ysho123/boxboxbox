var app = getApp();
const LLUtils = require("../utils/LLUtils.js");

Page({
//挂
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    listdata: [],
    openid: '',
    sf: '', //客服字段,
    imgs: [],
    check: 0,
    isHide: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    LLUtils.get_user_info(function(res) {
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

    //获取数据
    this.getlist();
  },
  // 获取用户信息
  getUserInfo: function(e) {
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
        success: function(res) {
          //存入缓存
          wx.setStorageSync(LLUtils.globalData.keyUserInfo, userdata);
          wx.setStorageSync('shows', 1);
          getData.call(that);
          var id = e.target.dataset.id;
          var click_type = e.target.dataset.type;
          if (click_type == 1) {
            wx.navigateTo({
              url: e.target.dataset.page + '?id=' + id + '&title=' + e.target.dataset.title,
            })
          } else if (click_type == 5) {
            wx.navigateTo({
              url: '../h5index/h5index?id=' + id + '&title=' + e.target.dataset.title + '&web=' + e.target.dataset.web_src,
            })
          }
        },
        fail: function(res) {}
      })
    }
  },
  // 查看数据
  add_data: function(e) {

    console.log('e', e.currentTarget.dataset.id)
    this.setData({
      id: e.currentTarget.dataset.id
    })
    getData.call(this)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //加载数据
    if (this.data.page) {
      this.getlist();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '这么棒的盒子，你确定不点进来？',
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
        console.log('分享成功')
      }
    }
  },

  //获取数据
  getlist: function() {
    var that = this;
    if (that.data.page == 0) {
      wx.showToast({
        title: '没有了……',
        icon: 'loading'
      });
      return false;
    }
    wx.request({
      url: LLUtils.globalData.host + '/zb/api/getlist_new',
      data: {
        page: that.data.page,
        xcx: "bgxid" + LLUtils.globalData.xid
        // xcx: "bgxid49"
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.info(res.data);
        if (res.data.status == 0) {
          that.setData({
            page: 0
          });
          wx.showToast({
            title: '没有了……',
            icon: 'loading'
          });
          return false;
        } else {
          if (res.data.status == 1) {
            var listdata = that.data.listdata.concat(res.data.data);
            that.setData({
              listdata: listdata,
              page: res.data.page,
              // check: res.data.check
            })
          } else {
            that.setData({
              page: 0
            })
          }
        }
      }
    })
  },

  //跳转详情页
  todetails: function(e) {
    var formid = e.detail.formId;
    LLUtils.saveFormid(formid);
    var id = e.detail.target.dataset.id;
    var click_type = e.detail.target.dataset.type;
    this.setData({
      id: id
    })
    console.log('click_type:', click_type);
    if (wx.getStorageSync('shows')) {
      getData.call(this);
      if (click_type == 1) {
        wx.navigateTo({
          url: e.detail.target.dataset.page + '?id=' + id + '&title=' + e.detail.target.dataset.title,
        })
      } else if (click_type == 5) {
        wx.navigateTo({
          url: '../h5index/h5index?id=' + id + '&title=' + e.detail.target.dataset.title + '&web=' + e.detail.target.dataset.web_src,
        })
      }
    }
  },

})
//用户隐藏跳转
function xcxIshide() {
  var that = this;
  wx.request({
    url: LLUtils.globalData.host + '/zb/api/getHide',
    data: {
      xcx: 'aa'
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function(res) {
      console.info(res.data);
      that.setData({
        isHide: res.data.status
      })
    }
  })
}


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
    success: function(res) {
      console.info(res.data);

    }
  })
}