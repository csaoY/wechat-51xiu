// pages/more/orderitem/orderitem.js
var util = require('../../../utils/util.js')
const _ = require('../../../utils/underscore');
const request = require('../../../utils/request');
const urls = require('../../../utils/urls');
const { timeUtil } = require('../../../utils/util');
var app = getApp()

Page({
  data: {
    deviceStatStr: "",//订单状态
    createTime: "",//下单时间
    totalPrice: 0,//总价
    orderDetailList: [],//设备故障列表
    orderid: "",//订单号
    orderInfo: ""//订单信息
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.orderid = options.orderId
    this.loadOrder();
  },
  makePhoneCall: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    wx.makePhoneCall({
      phoneNumber: '4008625151' //打客服电话
    })
  },
  backHome:function(){
    wx.navigateBack({
      delta: 4
    })
  },
  loadOrder() {
    var that = this;
    const values = _.extend({ id: "123" ,channel: 6, content: JSON.stringify({ "orderId": this.data.orderid }) });
    that.addRQId = request.get(urls.order_getByOrderId, values, function (data) {
      console.log(data);
      var createTime = data.orderInfo.createTime
      var deviceState = data.orderInfo.state
      var deviceStatStr = ""
      switch (deviceState) {
        case -1:
        deviceStatStr = "等待中"
          break
        case 0:
        deviceStatStr = "等待中"
          break
        case 1:
        deviceStatStr = "等待中"
          break
        case 2:
        deviceStatStr = "等待中"
          break
        case 3:
          deviceStatStr = "等待中"
          break
        case 4:
          deviceStatStr = "已完成"
          break
        case 6:
          deviceStatStr = "已取消"
          break
        case 7:
          deviceStatStr = "已完成"
          break
        default:
      }
      //计算总计
      var totalPrice = data.recycleDetail.reduce(function (prevVal, elem) {
        return prevVal + elem.PRICE;
      }, 0);
      that.setData({
        createTime: timeUtil.format('yyyy-MM-dd hh:mm:ss', createTime),
        deviceStatStr: deviceStatStr,
        orderInfo: data.orderInfo,
        totalPrice: totalPrice,
        orderDetailList: data.recycleDetail
      })
      console.log(that.data)
    }, this, { isShowLoading: true });
  }
})