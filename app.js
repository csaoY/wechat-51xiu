//app.js
//HotApp微信小程计接入只需要在小程序的入口文件app.js中引入一行代码:
// var hotapp = require('utils/hotapp.js');
//hotapp.setDebug(true); // 显示调试信息开关
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // hotapp.init("hotapp171640993")
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          that.authModal(cb)
        }
      })
    }
  },
  authModal: function (cb) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.globalData.userInfo = res.userInfo
        typeof cb == "function" && cb(that.globalData.userInfo)
      },
      fail: function () {
        wx.showModal({
          title: '警告',
          content: '若不授权微信登陆，则无法使用51修部分功能，点击重新获取授权，则可重新使用；',
          confirmText: "授权",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击授权')
              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.userInfo"]) {
                    that.authModal(cb)
                    console.log('用户没有授权。。！')
                  } else {
                    that.authModal(cb)
                  }
                }, fail: function (res) {
                  that.authModal(cb)
                  console.log('用户没有授权。。！')
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }//end fail
    })
  },
  onError: function (msg) {
    //错误日志上传
    // hotapp.onError(msg,"1.0.2",function (err) {
    //   console.log(err)
    // })
  },
  globalData: {
    userInfo: null
  }
})

// {
//   "pagePath": "pages/recycling/recycling",
//   "text": "回收",
//   "iconPath": "images/recycle.png",
//   "selectedIconPath": "images/recycle_focus.png"
// }