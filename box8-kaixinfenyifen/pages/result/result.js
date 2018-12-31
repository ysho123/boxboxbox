// miniprogram/pages/result/result.js
const wxUtils = require('../../wxUtils/wxUtils.js');
const APP = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ac_id: '',//当前活动id
    ac_Name: '运动会分组呀',
    showSharedPic : false,//是否展示分享图
    shenhe : 0,
    topInfo : {},
    listInfo : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { ac_id } = options;
    let ac_Name = options.ac_Name || '运动会分组呀'
    this.setData({
      ac_id: ac_id,
      ac_Name: ac_Name
    });
    wx.setNavigationBarTitle({ title: ac_Name });

    this.setData({
      shenhe : APP.shenhe
    });

    this.getResults();
  },

  getResults(){
    wxUtils.getOpenId((openid) => {
      if (this.data.ac_id) {
        wxUtils.request('getActiveGroup', { openid, aid: this.data.ac_id }, (res) => {
          // console.log('结果页', res);
          if(res.status == 1){
            let result = res.data;
            let topInfo = {
              sunNum: result.join_num,
              groupNum: result.group_num,
              unJionNum: result.join_num - result.already_num,
              ac_Name: result.title,
            }

            let listInfo = result.data;

            this.setData({
              topInfo: topInfo,
              listInfo: listInfo
            });
          }
        }, undefined, undefined, "GET");
      }
    });
  },

  refresh(){
    this.getResults();
  },

  getShareImage(e) {
    // console.log('getImage');
    this.setData({
      showSharedPic: true
    })
  },

  closeComponent(e) {
    // console.log('close Component');
    this.setData({
      showSharedPic: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let self = this;
    // if (e.from == 'button') {
      return {
        title: `${self.data.ac_Name},谁和我一组?`,
        path: `pages/goPage/goPage?ac_id=${self.data.ac_id}&ac_Name=${self.data.ac_Name}`
      }
    // }
  },

  backIndex(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
})