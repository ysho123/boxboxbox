
var requests = require("../../request/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_list: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    requests.getTzPage({}, (data) => {
      console.log('接口获取数据：', data)
      if (data.status == 1) {
        that.setData({
          page_list: data
        })
        console.log('page_list数据：', that.data.page_list);

      }
    }, null, null)
    var tzid = options.tzid;
    if (tzid) {
      requests.getTzxcxInfo({ 'tzid': tzid, 'cxid': 888 },
        (res) => {
          console.log('从其他小程序进来的用户+1');
        }, null, null);
    }
  },
  goIndex: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  }

})
