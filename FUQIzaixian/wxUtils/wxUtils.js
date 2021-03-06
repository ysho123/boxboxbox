const noop = function(){};

const BASE = "https://xcx.xc29.cn/source/plugin/fenzu/";
const URL = {
  getOpenId: BASE + "new_getCode.php", //GET请求  code=?	APPID   APPSECRETE
  saveUserInfo: BASE + "saveUserInfo.php", //GET请求   openid=?&nickname=?&imageurl=?	
  createGroupActive: BASE + "createGroupActive.php", //GET请求 openid=?&title=?&join_num=?&group_num=?&headimgurl=?&nickname=?
  checkUserJoinActive: BASE + "checkUserJoinActive.php",//GET   openid=?&aid=?	
  joinGroup: BASE + "joinGroup.php",//GET   openid=?&nickname=?&headimgurl=?&aid=?	
  getActiveGroup: BASE + "getActiveGroup.php",//GET   openid=?&aid=?	
  getUserJoinActiveList: BASE + "getUserJoinActiveList.php",//GET   openid=?&type=?	
  getQrcode: BASE + "getQrcode.php", //GET ?para=?&title=?&head=
  getIndexHide: BASE + "getIndexHide.php" //GET 
}

let wxUtils = {
  showLoading() {
    wx.showLoading({
      title: '请求中',
      mask: true,
    })
  },

  hideLoading() {
    wx.hideLoading();
  },

  request(url,data,success = noop,fail = noop,complete = noop,method = 'POST'){
    this.showLoading();
    wx.request({
      url: URL[url],
      data : data ,
      method : method ,
      success : (res)=>{
        console.log('请求成功的res',res)
        success(res.data);
      },
      fail : (err)=>{
        console.log('请求失败',err);
        fail(err);
      },
      complete : ()=>{
        this.hideLoading();
      }
    })
  },

  getOpenId(success = noop, fail = noop, complete = noop){
    let openId = wx.getStorageSync('openId');
    if (openId){
      success && success(openId);
    }else{
      wx.login({
        success : (res)=>{
          this.request('getOpenId', { code: res.code, appid: 'wxae100849482c2858', appsecret:'8b0fe6e97bf35dbe5fe12b182adc184a'},
            (res)=>{
              if(res.openid){
                wx.setStorageSync('openId', res.openid);
                success(res.openid);
              }else{
                this.getOpenId();
              }
            },(err)=>{
              this.getOpenId()
            }, undefined,"GET"
          )
        },
        fail : (err)=>{
          this.getOpenId(success, fail, complete);
        }
      })
    }
  },

  saveUserInfo({openid, nickName: nickname, avatarUrl : imageurl} , success , falil , complete){
    this.request('saveUserInfo',{openid,nickname, imageurl},(res)=>{
      if (res.status == 1){
        wx.setStorageSync('userInfo', { openid, nickname, imageurl });
        success(res);
      }
    },(err)=>{
      fail(res);
    }, undefined, "GET")
  },

  getUserInfo(){
    let userInfo = wx.getStorageSync('userInfo') || {};
    return userInfo ;
  },

  hasUserInfo(callBack){
    let hasLog = wx.getStorageSync('userInfo') || null;

    if(hasLog){
      console.log('缓存有用户信息');
      callBack(true);  
    }else{
      console.log('缓存没有用户信息');
      callBack(false);
    }
  },

  showPopMessage(title,success=false,sec=1000){
    wx.showToast({
      title: title ,
      icon: success ? 'success' : 'loading',
      duration : sec ,
      mask : true ,
    });
  },

  showPopModel(successFuc=noop){
    wx.showModal({
      title: '提示',
      content: '分享之后才能参与哟',
      showCancel: false,
      confirmText: '好的',
      // confirmColor: '	#000000',
      success : (res)=>{
        if (res.confirm) {
          console.log('用户点击确定')
          successFuc(res);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  downloadFile(fileId, successCallBack = noop, failCallBack = noop){
    wx.cloud.downloadFile({
      fileID: fileId, // 文件 ID
      success: res => {
        // 返回临时文件路径
        successCallBack(res);
      },
      fail: err => {
        failCallBack(err)
      }
    })
  },

}

module.exports = wxUtils;