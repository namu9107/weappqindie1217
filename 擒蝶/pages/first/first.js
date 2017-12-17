// pages/first/first.js
Page({
  clickMe: function () {
    wx.showToast({
      title: '成功',    
      duration: 2000, 
    })  
  },
  clickMe1: function () {
    wx.showToast({
      title: '未开始',  
      icon : 'loading', 
      duration: 2000,
    })
  },
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  data: {
    second: 300
  },
  onLoad: function () {
    countdown(this);
  }

})
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    // console.log("Time Out...");
    that.setData({
      second: "已结束"
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}
function dateformat(second) {
  var dateStr = "";
  var hr = Math.floor(second / 3600);
  var min = Math.floor((second - hr * 3600) / 60);
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  dateStr = hr + ":" + min + ":" + sec;
  return dateStr;
}
