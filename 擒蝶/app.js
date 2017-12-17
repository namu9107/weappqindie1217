//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },


  onShow: function () {
    console.log('App-onShow 生命周期函数--监听小程序显示');
  },

  onHide: function () {
    console.log('App-onHide 生命周期函数--监听小程序隐藏');
  },

  getUserInfo: function (cb) {
    var that = this

    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (r) {

          // 获取用户信息 
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })

          // 获取用户openid
          wx.request({
            url: 'https://www.cpcsign.com/api/login',
            data: {
              'js_code': r.code
            },
            method: 'GET',
            success: function (res) {
              console.log('---code 换取 openid---');
              wx.setStorageSync('openId', res.data.openid);
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    openId: ''
  }
})
