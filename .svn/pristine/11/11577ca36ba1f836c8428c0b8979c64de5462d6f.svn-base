// send.js
var util = require('../../../utils/util.js')
const _ = require('../../../utils/underscore');
const request = require('../../../utils/request');
const urls = require('../../../utils/urls');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: ''//订单ID
  },

  onLoad: function (options) {
    var orderId = options.orderId;
    this.setData({
      orderId: orderId
    })
    this.queryInexpress();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  queryInexpress: function () {
    var that = this
    const values = _.extend({
      id: "123",
      channel: 6,
      content: JSON.stringify({
        "orderId": that.data.orderId
      })
    }, "");
    that.addRQId = request.get(urls.queryInexpress, values, function (data) {
      console.log(data);
      that.setData({
        com: data.expressInfo.inExpressCompany,
        no: data.expressInfo.inExpressNo
      })
    }, that, { isShowLoading: true });
  },

  submitOrder: function (e) {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var com = e.detail.value.com//快递公司【必填】
    var no = e.detail.value.no //快递单号【必填】

    if (com.replace(/\s/g, "") == "") {
      wx.showToast({
        title: '请填写快递公司',
        icon: 'success',
        duration: 2000
      })
      return
    }
    
    if (no.replace(/\s/g, "") == "") {
      wx.showToast({
        title: '请填写快递单号',
        icon: 'success',
        duration: 2000
      })
      return
    }

    if (!(/^\w+$/.test(no))) {
      wx.showToast({
        title: '请填写正确的快递单号',
        icon: 'success',
        duration: 2000
      })
      return
    }

    const values = _.extend({
      id: "123",
      channel: 6,
      content: JSON.stringify({
        "orderId": that.data.orderId,
        "inexpressName": com,
        "inexpressNo": no
      })
    }, "");
    that.addRQId = request.post(urls.submitInexpress, values, function (data) {
      console.log(data);
      //成功
      wx.showModal({
        content: data.result.info,
        showCancel: false
      });
    }, that, { isShowLoading: true });

  },
})