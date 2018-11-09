// pages/Assessment/Assessment.js
var util = require('../../utils/util.js')
const _ = require('../../utils/underscore');
const request = require('../../utils/request');
const urls = require('../../utils/urls');

Page({
  data: {
    eventId: 0,
    phone: "",//评估型号
    versionId: "", //评估型号ID
    assessments: [],
    options:[],//功能选项列表
    assessments_length: 1
  },
  onLoad: function (options) {
    console.log('onLoad')
    this.init(options);
    this.loadAssessments();
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
  init: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var phone = options.phone;
    var versionId = options.versionId;
    console.log("接收到的参数是phone=" + options.phone + " versionId=" + options.versionId);
    this.setData({
      phone: phone,
      versionId: versionId
    });
  },
  //手机评估列表
  loadAssessments: function () {
    var that = this;
    const values = _.extend({ id: "123", channel: 6,content: JSON.stringify({ "versionId": that.data.versionId }) }, "");
    that.addRQId = request.get(urls.versionProperty_get, values, function (data) {
      var assessments = data.detailInfoList;
      for (var i = 0; i < assessments.length; i++) {
        var assessmentSub = assessments[i].detail;
        for (var y = 0; y < assessmentSub.length; y++) {
          var assessment = assessmentSub[y];
          assessment.isSelected = false
        }
      }
      var options = data.functionOptionsList;
      console.log("估价属性查询接口成功"+options);
      if(typeof options !='undefined') {
        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          option.isSelected = false
        }
      }
      
      that.setData({
        assessments: assessments,
        options: options,
        assessments_length: assessments.length
      });
      console.log("估价属性查询接口成功");
    }, this, {
      isShowLoading: false , failAfter: function (res) {
        that.setData({
          hasNetError: true
        });
      }});
  },
  onSelectItem: function (event) {
    var idx = event.currentTarget.dataset.idx;
    var assessmentName = event.currentTarget.dataset.assessmentname;
    var assessmentid = event.currentTarget.dataset.assessmentid;
    var eventId = parseInt(idx) + 1;
    var pro = eventId / this.data.assessments_length * 100;
    var currentAssessment = this.data.assessments[idx];//当前选中的Assessment
    currentAssessment.assessment_name_selected = assessmentName;
    var assessment = currentAssessment.detail;
    var assessmentLength = assessment.length
    for (var i = 0; i < assessmentLength; i++) {
      var assessmentSub = assessment[i];
      if (assessmentSub.id == assessmentid) {
        assessmentSub.isSelected = true
      } else {
        assessmentSub.isSelected = false
      }
    }
    this.setData({
      assessments: this.data.assessments,
      eventId: eventId,
      pro: Math.ceil(pro)
    })
    console.log(this.data.eventId)
  },
  //功能选项选择
  onSelectOptionItem: function (event) {
    var idx = event.currentTarget.dataset.idx;
    var optionid = event.currentTarget.dataset.optionid;
    var currentOption = this.data.options[idx];//当前选中的功能选项
    currentOption.isSelected = !currentOption.isSelected
    console.log('values: '+currentOption.isSelected)
    this.data.options[idx] = currentOption
    this.setData({
      options: this.data.options
    })
  },
  onModifyItem: function (event) {
    var idx = event.currentTarget.dataset.idx;
    var eventId = parseInt(idx);
    this.setData({
      eventId: eventId
    })
    console.log(this.data.eventId)
  },
  showList: function () {
      wx.navigateTo({
      url: "assessment_list/assessment_list?phone=" + this.data.phone + "&versionId=" + this.data.versionId + "&assessments=" + JSON.stringify(this.data.assessments)+ "&options=" + JSON.stringify(this.data.options)
    })
  },
  //网络刷新
  refresh: function () {
    console.log("刷新");
    this.setData({
      hasNetError: false
    });
    this.loadAssessments()
  }

})