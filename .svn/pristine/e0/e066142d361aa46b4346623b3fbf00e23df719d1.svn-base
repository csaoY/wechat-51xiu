// pages/more/myorder/myorder.js

var util = require('../../../utils/util.js')
const _ = require('../../../utils/underscore');
const request = require('../../../utils/request');
const urls = require('../../../utils/urls');
const { timeUtil } = require('../../../utils/util');
var app = getApp();

Page({
  data: {
    isOrderListEmpty:false,//列表为空
    orderList: []//订单列表
  },
  onUnload: function () {
    // 页面关闭
    try {
      wx.removeStorageSync('myOrderList')
    } catch (e) {
      // Do something when catch error
    }
  },
  onLoad: function (options) {
    this.myorder()
  },
  myorder: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var that = this;
    var openId = ""
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      if (!userInfo) {
        return
      } else {
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              openId = res.code
              if (request.isLoading(that.addRQId)) return;
              const values = _.extend({ id: "123" ,channel: 6, content: JSON.stringify({ "openId": openId, "index": 0}) }, "")
              that.addRQId = request.get(urls.order_query, values, function (data) {
                if (data.result.code == 2000) {
                  var myOrderList = data.orderList
                  var new_orderList = myOrderList.map(function (elem) {
                    elem.createTime = timeUtil.format('yyyy-MM-dd hh:mm:ss', elem.createTime),
                      elem.state = deviceStateStr(elem.state, elem.orderType)
                    return elem
                  });
                  that.setData({
                    isOrderListEmpty: new_orderList.length==0,
                    orderList: new_orderList
                  }); console.log(new_orderList)
                } else if (data.result.code == 5018) {
                  wx.navigateTo({
                    url: '../login/login'
                  })
                }
                console.log("装载我的订单查询成功")
              }, that, { isShowLoading: true }
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

  },
  orderitem: function (e) {
    if (util.isRepeatClick()) return//判断是否为重复点
    var id = e.currentTarget.dataset.id;
    var ordertype = e.currentTarget.dataset.ordertype
    if (ordertype == '1') {//维修订单
      wx.navigateTo({
        url: '../orderitem/orderitem?orderId=' + id
      })
    } else if (ordertype == '2') {//售后订单
      wx.navigateTo({
        url: '../orderitem/orderitem?orderId=' + id
      })
    }else if (ordertype == '3') {//回收订单
      wx.navigateTo({
        url: '../orderitemre/orderitemre?orderId=' + id
      })
    }
  },
  send:function(e){
    var orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../send/send?orderId=' + orderId
    })
  }
})

function deviceStateStr(deviceState, ordertype) {
  var deviceStatStr = ""
  if (ordertype == '1') {//维修单
    switch (deviceState) {
      case -1:
        deviceStatStr = "已提交"
        break
      case 0:
        deviceStatStr = "已提交"
        break
      case 1:
        deviceStatStr = "已提交"
        break
      case 2:
        deviceStatStr = "已分派"
        break
      case 3:
        deviceStatStr = "修理中"
        break
      case 4:
        deviceStatStr = "已修理"
        break
      case 5:
        deviceStatStr = "已付款(已完成)"
        break
      case 6:
        deviceStatStr = "已取消"
        break
      case 7:
        deviceStatStr = "已完成"
        break
      default:
    }
  } else if (ordertype == '3') {//回收单
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
  }

  return deviceStatStr
}