// pages/tab1/tab1.js
import Base from "../../utils/base.js";
const base=new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._loadData();
  },
  async _loadData(){
    // 加载首页轮播图数据
    const {items:bannerData}=await base.request("banner/1");
    console.log("轮播图数据",bannerData);
    // 加载精选主题数据
    const themeData=await base.request("theme?ids=1,2,3");
    console.log("主题数据",themeData);
    // 加载最近新品数据
    const recentData=await base.request("product/recent");
    console.log("新品数据",recentData);
    this.setData({
      bannerData,
      themeData,
      recentData,
    })
  },

  // onGood(e){
  //   const id=e.mark.id;
  //   wx.navigateTo({
  //     url: '/pages/details/details?id='+id,
  //   });
  // },
  toTheme(e){
    // 获取主题id
    const id=e.mark.id;
    wx.navigateTo({
      url: '/pages/theme/theme?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})