// pages/last/last.js
var util = require('../../../utils/util.js')
Page({
  data: {
    orderid: "",//订单号
    ind: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.orderid = options.orderid
    var mailInfo = wx.getStorageSync("mailInfo")
    var precautions = wx.getStorageSync("precautions")
    this.setData({
      ind:options.cityIndex,
      precautions: precautions,
      mailInfo: mailInfo
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //订单详情
  orderDetail: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    wx.redirectTo({
      url: '../../more/orderitem/orderitem?orderId=' + this.data.orderid
    })
  },
  //返回首页
  backHome: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    wx.navigateBack({
      delta: 3
    })
  }
})