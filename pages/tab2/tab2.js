// pages/tab2/tab2.js
import Base from "../../utils/base.js";
const base=new Base();
const localData=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex:0,
    currentTab:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this._loadData();
    this.getRightData(0);
  },

  async _loadData() {
    const cateData=await base.request("category/all");
    this.setData({
      cateData,
    })
  },
  // 获取某一数据的商品数据
  async getProduct(id){
    const products=await base.request("product/by_category",{ id });
    return products;
  },
  // 组装右侧数据
  async getRightData(index){
    // 先查看记录册是否有当前分类数据
    if(localData[index]){
      this.setData(localData[index]);
      return;
    }
    // 记录册没有当前分类，需要去服务器重新加载
    // 获取当前分类
    const cate = this.data.cateData[index];
    const rightData={
      headImg:cate.img.url,
      name:cate.name,
      products:await this.getProduct(cate.id),
    };
    this.setData(rightData);
    // 把当前分类数据保存至记录册
    localData[index] = rightData;
  },
  onTab(e){
    const index=e.mark.index;
    this.setData({
      curIndex:index,
    });
    this.getRightData(index);
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