// pages/band/selectmodel/selectmodel.js

var util = require('../../../utils/util.js')
const _ = require('../../../utils/underscore');
const request = require('../../../utils/request');
const urls = require('../../../utils/urls');

var app = getApp();
Page({
  data: {
    currentSelectedMobile: "0",//当前选中型号
    currentSelectedColor: "0",//当前选中颜色
    versionList: [],//机型列表
    colorList: [],//颜色列表
    planList: [],//故障列表
    selectedPlanList: [],//用户选择的故障列表
    currentSelectedVersionId: "",//当前选中型号ID
    currentSelectedColorId: "",//当前选中颜色ID
    typeId: "",//类型ID"
    brandId: "",//品牌ID"
    totalPrice: 0,//维修总价格
    selectItemCount: 0,//选择的维修项数量
    hasNetError: false//是否网络错误
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var typeId = options.typeId;
    var brandId = options.brandId;
    console.log("接收到的参数是typeId=" + options.typeId + " brandId=" + options.brandId);
    this.setData({
      typeId: typeId,
      brandId: brandId
    })
    //根据品牌ID与类型ID查询型号接口
    this.loadVersion();
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
  mobileTypeTap: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var versionid = e.currentTarget.dataset.versionid;
    this.setData({
      currentSelectedMobile: idx,
      currentSelectedVersionId: versionid,
      selectedPlanList: []//重置
    });
    this.loadVersionQueryVersionColor(versionid)
  },
  next: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    console.log("../../brand/placeorder/placeorder?selectedPlanList=" + JSON.stringify(this.data.selectedPlanList) + "&totalPrice=" + this.data.totalPrice)
    wx.navigateTo({
      url: "../../brand/placeorder/placeorder?selectedPlanList=" + JSON.stringify(this.data.selectedPlanList) + "&totalPrice=" + this.data.totalPrice
    })
  },
  detailed: function (e) {
    if (util.isRepeatClick()) return//判断是否为重复点击
    var plan = e.currentTarget.dataset.plan
    wx.navigateTo({
      url: "../detailed/detailed?plan=" + JSON.stringify(plan)
    })
  },
  //选择颜色
  switchColor: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var colorid = e.currentTarget.dataset.colorid;
    this.setData({
      selectedPlanList: [],//重置
      currentSelectedColor: idx,
      currentSelectedColorId: colorid
    });
    this.loadFaultQueryById(colorid)
  },
  //根据品牌ID与类型ID查询型号
  loadVersion: function () {
    var that = this;
    if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "123" ,channel: 6, content: JSON.stringify({ "brandId": that.data.brandId, "deviceTypeId": that.data.typeId }) }, "")
    that.addRQId = request.get(urls.version_queryById, values, function (data) {
      var currentSelectedVersionId = 0
      if (typeof data.versionInfo[0] != 'undefined') {
        currentSelectedVersionId = data.versionInfo[0].id
      }
      that.setData({
        versionList: data.versionInfo,
        currentSelectedVersionId: currentSelectedVersionId
      });
      that.loadVersionQueryVersionColor(currentSelectedVersionId)
      console.log("根据品牌ID与类型ID查询型号接口成功");
    }, this, { isShowLoading: false });
  },
  //根据型号查询颜色
  loadVersionQueryVersionColor: function (versionId) {
    var that = this;
    // if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "456" ,channel: 6, content: JSON.stringify({ "versionId": versionId }) }, "")
    that.addRQId = request.get(urls.version_queryVersionColor, values, function (data) {
      var currentSelectedColorId = 0
      if (typeof data.colorList[0] != 'undefined') {
        currentSelectedColorId = data.colorList[0].id
      }
      that.setData({
        colorList: data.colorList,
        currentSelectedColorId: currentSelectedColorId,
        currentSelectedColor: 0,
        hasNetError: false
      });
      that.loadFaultQueryById(currentSelectedColorId)
      console.log("根据型号查询颜色接口成功");
    }, this, {
        isShowLoading: false, failAfter: function (res) {
          console.log("根据型号查询颜色接口失败");
          that.setData({
            colorList: [],
            planList: [],
            hasNetError: true
          });
        }
      });
  },
  //根据颜色型号查询故障列表
  loadFaultQueryById: function (colorId) {
    var that = this;
    // if (request.isLoading(this.addRQId)) return;
    const values = _.extend({ id: "789" ,channel: 6, content: JSON.stringify({ "colorId": colorId }) }, "")
    that.addRQId = request.get(urls.fault_queryById, values, function (data) {
      var planList = data.planList
      var planListLength = planList.length
      for (var i = 0; i < planListLength; i++) {
        var planList2 = planList[i].planList
        var planList2Length = planList2.length
        for (var y = 0; y < planList2Length; y++) {
          var plan = planList2[y];
          plan.isSelected = false
        }
      }

      that.setData({
        planList: planList,
        selectItemCount: 0,
        totalPrice: 0,
        hasNetError: false
      });
      console.log("根据颜色型号查询故障列表接口成功");
    }, this, {
        isShowLoading: false, failAfter: function (res) {
          console.log("根据颜色型号查询故障列表接口失败");
          that.setData({
            planList: [],
            hasNetError: true
          });
        }
      }
    );
  },
  //维修项选择
  onSelectItem: function (event) {
    var totalPrice = this.data.totalPrice//维修总价格
    var selectItemCount = this.data.selectItemCount//选择的维修项数量
    var id = event.currentTarget.dataset.id;
    var planList = this.data.planList
    var planListLength = planList.length
    for (var i = 0; i < planListLength; i++) {
      var planList2 = planList[i].planList
      var planList2Length = planList2.length
      for (var y = 0; y < planList2Length; y++) {
        var plan = planList2[y];
        if (plan.id == id) {
          plan.isSelected = !plan.isSelected//置反
          if (plan.isSelected) {
            selectItemCount += 1
            totalPrice += plan.price
            //添加到选中的维修项中
            this.data.selectedPlanList.push(plan)
          } else {
            selectItemCount -= 1
            totalPrice -= plan.price
            //从选中的维修项中删除
            for (var k = this.data.selectedPlanList.length; k--;) {
              if (this.data.selectedPlanList[k].id === plan.id) {
                this.data.selectedPlanList.splice(k, 1);
                break
              }
            }
          }
        }
      }
    }
    this.setData({
      selectedPlanList: this.data.selectedPlanList,
      planList: planList,
      selectItemCount: selectItemCount,
      totalPrice: totalPrice
    });
  },
  //网络刷新
  refresh: function () {
    console.log("刷新");
    this.setData({
      hasNetError: false
    });
    this.loadVersionQueryVersionColor(this.data.currentSelectedVersionId)
  }

})