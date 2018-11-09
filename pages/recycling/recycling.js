//recycling.js
var util = require('../../utils/util.js')
const _ = require('../../utils/underscore');
const request = require('../../utils/request');
const urls = require('../../utils/urls');

var app = getApp()
Page({
  data: {
    currentSelectedMobile: "0",
    currentSelectedBrandId: "",//当前选中BrandId
    currentSelectedTypeId: "",//当前选中TypeID
    phoneTypeInfoId: "",//phone类型ID
    padTypeInfoId: "",//pad类型ID
    type: "phone",
    mobiles: [],//品牌列表数据
    versionList: [],//品牌下对应的所有的型号
    scrollViewHeight: "100",
    isShare: false,//用于解决转发点开的页面在ios系统上有高度的问题
    hasNetError:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var isShare = options.isShare
    if (typeof isShare != 'undefined') {
      this.data.isShare = isShare
    }
    this.loadMobiles();
  },
  onShareAppMessage: function () {
    return {
      title: '51修丨手机维修与回收微信小程序',
      path: '/pages/recycling/recycling_shanhs/recycling_shanhs',
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
  //获取回收品牌与类型数据接口
  loadMobiles: function () {
    var that = this;
    if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "123",channel: 6 }, "");
    that.addRQId = request.get(urls.recyclebrand_query, values, function (data) {
      that.recycleVersionQuery(data.brandInfo[0].id, data.typeInfo[0].id)
      that.setData({
        currentSelectedBrandId: data.brandInfo[0].id,
        mobiles: data.brandInfo,
        phoneTypeInfoId: data.typeInfo[0].id,
        padTypeInfoId: data.typeInfo[1].id
      });
      console.log("获取回收品牌与类型数据接口成功");
    }, this, { isShowLoading: false });

    wx.getSystemInfo({
      success: function (res) {
        var extendHeight = 0;
        if (res.platform == "android") {
          extendHeight = res.windowHeight + 50;
        } else if (res.platform == "ios" && that.data.isShare==false) {
          // extendHeight = res.windowHeight - 52;
          extendHeight = res.windowHeight;
        } else if (res.platform == "devtools") {
          extendHeight = res.windowHeight;
        }else {
          extendHeight = res.windowHeight;
        }
        that.setData({
          scrollViewHeight: extendHeight
        });
      }
    })
  },
  //获取回收型号数据接口
  recycleVersionQuery: function (brandId, typeId) {
    var that = this;
    const values = _.extend({ id: "123", channel: 6, content: JSON.stringify({ "brandId": brandId, "typeId": typeId }) }, "");
    that.addRQId = request.get(urls.recycleVersion_query, values, function (data) {
      that.setData({
        currentSelectedTypeId: typeId,
        versionList: data.versionList
      });
      console.log("获取回收型号数据接口成功");
    }, this, {
        isShowLoading: false, failAfter: function (res) {
          that.setData({
            versionList: [],
            hasNetError: true
          });
        }
      });
  },
  switchTab: function (e) {
    var type = e.currentTarget.dataset.type;
    if (type == 'phone') {
      type = "phone"
      this.recycleVersionQuery(this.data.currentSelectedBrandId, this.data.phoneTypeInfoId)
    } else if (type == 'pad') {
      type = "pad"
      this.recycleVersionQuery(this.data.currentSelectedBrandId, this.data.padTypeInfoId)
    }

    this.setData({
      type: type
    });
  },
  mobileTypeTap: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var brandId = e.currentTarget.dataset.brandid;
    this.setData({
      currentSelectedMobile: e.currentTarget.dataset.idx,
      currentSelectedBrandId: brandId
    });
    this.recycleVersionQuery(brandId, this.data.currentSelectedTypeId)
  },
  ontapTobuy: function (e) {
    var phone = e.currentTarget.dataset.phone;
    var versionId = e.currentTarget.dataset.versionid;
    wx.navigateTo({
      url: "../assessment/assessment?phone=" + phone + "&versionId=" + versionId
    })
  }, //网络刷新
  refresh: function () {
    console.log("刷新");
    this.setData({
      hasNetError: false
    });
    this.recycleVersionQuery(this.data.currentSelectedBrandId, this.data.currentSelectedTypeId)
  }
})
