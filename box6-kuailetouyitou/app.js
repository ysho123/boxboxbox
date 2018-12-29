var aldstat = require("./utils/ald-stat.js");
var requests = require('request/request.js');

//app.js
App({
  data: {
    openid: null,
  },
	
  globalData: {
    keyUserInfo: "userInfo",
    host: "https://xcx.xc29.cn/",
    appid: "wx0e88fa5ee34b9f45",
    appsecret: "784e46f49076e9b555e5a26ce914c07c"
  },
  
  onLaunch: function () {
    //瓜子
  },

  //查用户是否存了头像和昵称(如果有的话会返回头像和昵称)
  checkUserInfo(callback){
    this.get_user_openid((res) => {
      let openid = res.openid;
      let DbhasUserInfo = wx.getStorageSync('DbhasUserInfo');
      let userInfo = wx.getStorageSync('userInfo');
      if (DbhasUserInfo && userInfo){
        callback && callback(DbhasUserInfo, userInfo)
      }else{
        requests.checkUserInfo({ openid }, (res) => {
          wx.setStorageSync('DBhasUserInfo', res.status);
          wx.setStorageSync('userInfo', { imageurl: res.imageurl, nickname: res.nickname, openid: openid});
          callback && callback(res.status, { imageurl: res.imageurl, nickname: res.nickname, openid: openid})
        });
      }
    });
  },

  //获取用户openid
  get_user_openid: function (e) {
    var that = this;
    var userinfo = wx.getStorageSync(that.globalData.keyUserInfo);
    if (userinfo) {
      typeof e == "function" && e(userinfo);
    } else {
      that.login(e);
    }
  },

  get_user_info(callback){
    this.checkUserInfo((result,userInfo)=>{
      callback && callback(userInfo);
    });
  },

  //登录
  login: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //去服务器获取用户id
          wx.request({
            url: that.globalData.host + 'source/plugin/toupiao/new_getCode.php',
            data: {
              code: res.code,
              appid: that.globalData.appid,
              appsecret: that.globalData.appsecret
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.openid) {
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
      url: that.globalData.host + '/source/plugin/toupiao/saveUserInfo.php',
      data: userdata,
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
      }
    })
  },
})