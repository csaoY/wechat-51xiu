//logs.js
var util = require('../../utils/util.js')
const _ = require('../../utils/underscore');
const request = require('../../utils/request');
const urls = require('../../utils/urls');
var app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  makePhoneCall: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    wx.makePhoneCall({
      phoneNumber: '4008625151' //打客服电话
    })
  },
  myorder: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      if (!userInfo) {
        return
      } else {
        var openId = ""
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              openId = res.code
              if (request.isLoading(that.addRQId)) return;
              const values = _.extend({ id: "123" ,channel: 6, content: JSON.stringify({ "openId": openId, "index": 0}) }, "")
              that.addRQId = request.get(urls.order_query, values, function (data) {
                if (data.result.code == 2000) {
                  wx.navigateTo({
                    url: 'myorder/myorder'
                  })
                } else if (data.result.code == 5018) {
                  wx.navigateTo({
                    url: '../login/login'
                  })
                }
                console.log("装载我的订单查询成功")
              }, that, { isShowLoading: false }
              );
            } else {
              wx.showToast({
                title: '需要允许微信授权才能继续使用',
                icon: 'success',
                duration: 2000
              })
              console.log('获取用户登录态失败！' + res.errMsg)
              return
            }
          }
        })
      }
    })
  }
})