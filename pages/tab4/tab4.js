// pages/tab4/tab4.js
import Base from "../../utils/base";
import Address from "../../utils/address";
const base = new Base();
const address = new Address();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:[],//用来保存订单商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取所有订单
    this.getAllOrder();
    // 从服务器获取默认地址
    const addressInfo=await address.getAddress();
    this.setData({addressInfo})
  },
  // 点击图片获取用户信息
  getInfo(){
    // 获取用户头像和昵称
    this.getUserInfo();
  },
  async getUserInfo(){
    const res=await wx.getUserProfile({
      desc: '获取您的昵称和头像',
    });
    const {avatarUrl,nickName}=res.userInfo;
    this.setData({
      avatarUrl,
      nickName,
    })
  },
  async getAllOrder(){
    const res=await base.request("order/by_user",{page:1});
    console.log("订单数据",res);
    this.setData({
      orderData:res.data,
    });
  },

  async onChoose(){
    const res=await wx.chooseAddress();
    this.setData({
      addressInfo:address._bindAddress(res)
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