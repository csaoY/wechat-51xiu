// pages/band/detailed/detailed.js
var util = require('../../../utils/util.js')
Page({
  data: {
    plan: [],
    selectedPlanList: [],
    totalPrice: 0
  },
  onLoad: function (options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    this.data.plan = JSON.parse(options.plan);
    var planList = this.data.plan.planList
    planList.map(function (plan) {
      if (plan.isSelected) {
        that.data.totalPrice += plan.price
        //添加到选中的维修项中
        that.data.selectedPlanList.push(plan)
      }
      return plan
    });

    this.setData({
      selectedPlanList: this.data.selectedPlanList,
      plan: this.data.plan,
      totalPrice: this.data.totalPrice
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
  next: function () {
    if (util.isRepeatClick()) return//判断是否为重复点击
    wx.navigateTo({
      url: "../../brand/placeorder/placeorder?selectedPlanList=" + JSON.stringify(this.data.selectedPlanList) + "&totalPrice=" + this.data.totalPrice
    })
  },
  //维修项选择
  selectItem: function (event) {
    var totalPrice = this.data.totalPrice//维修总价格
    var id = event.currentTarget.dataset.id;
    var planList = this.data.plan.planList
    var planListLength = planList.length
    for (var y = 0; y < planListLength; y++) {
      var plan = planList[y];
      if (plan.id == id) {
        plan.isSelected = !plan.isSelected//置反
        if (plan.isSelected) {
          totalPrice += plan.price
          //添加到选中的维修项中
          this.data.selectedPlanList.push(plan)
        } else {
          totalPrice -= plan.price
          //从选中的维修项中删除
          for (var i = this.data.selectedPlanList.length; i--;) {
            if (this.data.selectedPlanList[i].id === plan.id) {
              this.data.selectedPlanList.splice(i, 1);
              break
            }
          }
        }
      }
    }
    this.setData({
      selectedPlanList: this.data.selectedPlanList,
      plan: this.data.plan,
      totalPrice: totalPrice
    });
  }

})