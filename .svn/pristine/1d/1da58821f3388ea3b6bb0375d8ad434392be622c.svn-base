var util = require('../../utils/util.js')
const _ = require('../../utils/underscore');
const request = require('../../utils/request');
const urls = require('../../utils/urls');
var app = getApp();

Page({
  data: {
    text: "内存升级页面",
    postid: "",//被选中的内存升级型号的id
    upid: '',//被选中的升级内存容量的id
    price: '',//价格
    selectedPlanList: [],//用户选择的故障列表
    hasNetError: false//是否网络错误
  },
  onLoad: function (options) {
    this.loaditem();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onShareAppMessage: function () {
    return {
      title: '51修丨手机维修与回收微信小程序',
      path: '/pages/memoryUpgrade/memoryUpgrade',
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
  loaditem: function () {
    var that = this;
    if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "123" ,channel: 6 }, "");
    that.addRQId = request.get(
      urls.versionRam_queryById,
      values,
      function (data) {
        that.setData({
          versionList: data.versionList
        });
        console.log(data);
        console.log("装载内存列表成功");
      },
      this,
      {
        isShowLoading: false, failAfter: function (res) {
          that.setData({
            hasNetError: true
          });
        }
      }
    );
  },
  selectmodel: function (event) {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var versionid = event.currentTarget.dataset.id;
    var versionName = event.currentTarget.dataset.versionName
    if (this.data.postid == versionid) return;
    this.setData({
      postid: versionid,
      versionName: versionName,
      price: '',
      selectedPlanList: [],//重置
      upid: ''
    });
    this.loadVersionRamFaultQueryById(versionid)
  },
  //根据品牌ID与类型ID查询型号
  loadVersionRamFaultQueryById: function (versionid) {
    var that = this;
    if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "123" ,channel: 6, content: JSON.stringify({ "versionId": versionid }) }, "")
    that.addRQId = request.get(urls.versionRamFault_queryById, values, function (data) {
      that.setData({
        ramPlanList: data.ramPlanList
      });
      console.log(data);
    }, this, { isShowLoading: false });
  },
  //选择内存
  sizeselect: function (event) {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var upid = event.currentTarget.dataset.id
    var price = event.currentTarget.dataset.price
    var list = event.currentTarget.dataset.list
    this.data.selectedPlanList = []//用户选择的故障列
    var selectedPlan = {}
    selectedPlan.faultPartDetail = list.detail
    selectedPlan.plan = list.plan
    selectedPlan.price = list.price
    selectedPlan.id = list.pId
    this.data.selectedPlanList.push(selectedPlan)

    this.setData({
      upid: upid,
      price: price,
      selectedPlanList: this.data.selectedPlanList
    });
    console.log(this.data.selectedPlanList)
  },
  //下一步
  next: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var that = this;
    wx.navigateTo({
      url: "../brand/placeorder/placeorder?selectedPlanList=" + JSON.stringify(this.data.selectedPlanList) + "&totalPrice=" + this.data.price
    })
  },
  //网络刷新
  refresh: function () {
    console.log("刷新");
    this.setData({
      hasNetError: false
    });
    this.loaditem()
  }
})