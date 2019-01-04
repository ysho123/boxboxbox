const ald = require('./AldUtils/ald-stat.js')
const wxUtils = require('./wxUtils/wxUtils.js');

//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      
    }

    this.globalData = {}
    this.shenhe();//审核接口
  },

  shenhe(){
    wxUtils.request('getIndexHide',{},(res)=>{
      this.shenhe = res.status ;
    });
  }
})
