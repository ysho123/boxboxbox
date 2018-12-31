var app = getApp();

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
    getTzPage.call(this);
    
    var tzid = options.tzid;
    if (tzid) {
      requests.getTzxcxInfo({ 'tzid': tzid, 'cxid': 49},
        (res) => {
          console.log('从其他小程序进来的用户+1');
        }, null, null);
    }
  },
  goIndex: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  }

})
function getTzPage() {
  var that = this;
  wx.request({
    url: app.globalData.host + '/zb/api/getTzPage',
    data: {},
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (data) {
      console.info(data);
      if (data.data.status == 1) {
        that.setData({
          page_list: data.data
        })
        console.log('page_list数据：', that.data.page_list);

      }
    }
  })
}