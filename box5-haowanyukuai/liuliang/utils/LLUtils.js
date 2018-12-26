let utils = {
  globalData: {
    xid: 105,
    keyUserInfo: "userInfo1",
    host: "https://xcx.yo91m.cn"
  },

  //获取用户openid
  get_user_info: function (callback) {
    var that = this;
    var userInfo = wx.getStorageSync(that.globalData.keyUserInfo);
    if (userInfo.nickname) {
      typeof callback == "function" && callback(userInfo);
    } else {
      this.get_user_openid(callback);
    }
  },

  //获取用户openid
  get_user_openid: function (callback) {
    var that = this;
    var userinfo = wx.getStorageSync(that.globalData.keyUserInfo);
    if (userinfo) {
      typeof callback == "function" && callback(userinfo);
    } else {
      that.login(callback);
    }
  },

  //登录
  login: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //去服务器获取用户id
          wx.request({
            url: that.globalData.host + '/user/api/login',
            data: {
              code: res.code,
              xid: that.globalData.xid
            },
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.uid) {
                //用户信息写入缓存
                wx.setStorageSync(that.globalData.keyUserInfo, res.data);
                typeof e == "function" && e(res.data);
              } else {
                that.login(e);
              }
            },
            fail: function (e) {
              that.login(e);
            }
          });
        } else {
          that.login(e);
        }
      },
      fail: function (e) {
        that.login(e);
      }
    });
  },

  //写入用户信息
  saveUserInfo: function (userdata) {
    var that = this;
    //发起网络请求
    wx.request({
      url: that.globalData.host + '/user/api/saveuser',
      data: userdata,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //存入缓存
        wx.setStorageSync(that.globalData.keyUserInfo, userdata);
        wx.setStorageSync('shows', 1);
      },
      fail: function (res) {
      }
    })
  },

  //写入formid
  saveFormid: function (formid) {
    console.info("formid:" + formid);
    var that = this;
    // 获取用户openid
    that.get_user_openid(function (res) {
      //formid入库
      wx.request({
        url: that.globalData.host + '/zb/api/saveformid',
        data: {
          xid: that.globalData.xid,
          openid: res.openid,
          formid: formid
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
        },
        fail: function (res) {
        }
      });
    });
  }
}

module.exports = utils ;