// component/saveUserInfo.js
const app = getApp();



Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  attached(){
    app.checkUserInfo((result,userInfo) => {
      this.setData({
        dbHasUserInfo: result
      });
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    dbHasUserInfo: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      console.log(e);
      if (e.detail.userInfo){
        let { nickName: nickname, avatarUrl: imageurl } = e.detail.userInfo;
        app.get_user_openid((res) => {
          let openid = res.openid;
          var userdata = {
            openid,
            nickname,
            imageurl
          };
          app.saveUserInfo(userdata);
          this.setData({
            dbHasUserInfo: true
          });
        });
      }else{
        wx.showModal({
          title: '提示',
          content: '需要授权才能使用',
        })
      }
    },
  }
})
