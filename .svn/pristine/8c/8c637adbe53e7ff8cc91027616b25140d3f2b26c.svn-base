//band.js
var util = require('../../utils/util.js')
const _ = require('../../utils/underscore');
const request = require('../../utils/request');
const urls = require('../../utils/urls');

var app = getApp();
Page({
  data: {
    hasNetError: false,
    item: {

    },
    currentNavtab: "0",
    imgUrls: [
      '../../images/mobile_ad_shili.jpg',
      '../../images/memory.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    brandInfo: []//维修品牌信息列表
  },
  onLoad: function () {
    console.log('onLoad')
    this.loadBandQuery();
    console.log(this.data);

  },
  onShareAppMessage: function () {
    return {
      title: '51修丨手机维修与回收微信小程序',
      path: '/pages/brand/brand',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '感谢分享',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bannerTap: function (event) {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var src = event.currentTarget.dataset.src;
    if (src.includes("memory.jpg")) {
      wx.navigateTo({
        url: '../memoryUpgrade/memoryUpgrade'
      })

    }
  },
  bindQueTap: function (e) {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var brandId = e.currentTarget.dataset.brandid
    var typeId = e.currentTarget.dataset.typeid
    wx.navigateTo({
      url: 'selectmodel/selectmodel?typeId=' + typeId + "&brandId=" + brandId
    })
  },
  //网络请求数据, 实现刷新
  loadBandQuery: function () {
    var that = this;
    if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "123" ,channel: 6}, "");
    that.addRQId = request.get(urls.brand_query, values, function (data) {
      that.setData({
        brandInfo: data.brandInfo
      });
      console.log("装载维修列表成功");
    }, this, {
        isShowLoading: false,
        failAfter: function (res) {
          that.setData({
            hasNetError: true
          });
        }
      }
    );
  },
  //网络刷新
  refresh: function () {
    console.log("刷新");
    this.setData({
      hasNetError: false
    });
    this.loadBandQuery()
  }
});
