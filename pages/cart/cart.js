// pages/cart/cart.js
let cartData=wx.getStorageSync("cart");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData,
    isDisable:false,//控制-按钮是否禁用
    all:"/imgs/icon/all.png",
    allSelected:"/imgs/icon/all@selected.png",
    isAllSelected:false,
  },
  onShow() {
    cartData=wx.getStorageSync("cart");
    this.setData({cartData});
    // 初始化全选状态
    this.getTotal();
    // 初始化商品总数和总价
    this.getAllStatus();
  },
  onChange(e){
    // 拿到当前要操作的id 以及操作类型
    let {id,type}=e.detail;
    console.log(id);
    // 根据id在购物车中找商品
    const product=cartData.find((item)=>{
      return item.id==id;
    })
    // 更新商品数量
    if (type=="add") {
      product.cou++;
    }else if(type=="cut"){
      product.cou--;
      if (product.cou<1) {
        this.setData({isDisable:true});
        product.cou=1;
      }
    }else if(type=="select"){
      // 更新商品状态
      product.status = !product.status;
    }
    // 更新页面
    this.setData({
      cartData,
    });
    wx.setStorageSync("cart", cartData);
    if (type=="select") {
      this.getAllStatus();
    }
    this.getTotal();
  },
  // 删除操作
  onDel(e){
    // 取当前要删除商品的id
    const id=e.detail.id;
    // 在购物车中找当前商品对应的下标
    const index=cartData.findIndex((item)=>{
      return item.id==id;
    });
    // 从购物车中把该下标对应的商品删掉
    cartData.splice(index,1);
    // 更新数据
    this.setData({
      cartData,
    });
    // 更新缓存
    wx.setStorageSync("cart", cartData);
    // 更新商品总价
    this.getTotal();
  },
  // 判断多选按钮是否要选中
  getAllStatus(){
    // 判断购物车（缓存）中是否所有商品的状态都是选中的
    const isAllSelected=cartData.every((item)=>{
      return item.status;
    })
    // 更新全选状态
    this.setData({isAllSelected});
  },
  // 求总数和总价
  getTotal(){
    // 先获取所有选中的商品
    const selectedData=cartData.filter((item)=>{
      return item.status;
    });
    console.log(selectedData);
    let totalNum=0;
    let totalPrice=0;
    selectedData.forEach(item=>{
      totalNum+=item.cou;
      totalPrice+=Math.floor(item.price*100)*item.cou;
    });
    this.setData({
      totalNum,
      totalPrice:totalPrice/100,
    });
  },
  // 全选按钮点击
  onAllSelect(){
    // 点击后对当前全选状态下取反
    const allStatus = !this.data.isAllSelected;
    // 所有商品的状态要跟全选一致
    cartData.forEach((item)=>{
      item.status=allStatus;
    });
    // 更新页面
    this.setData({
      isAllSelected:allStatus,
      cartData,
    });
    // 更新缓存
    wx.setStorageSync('cart', cartData);
    // 更新商品总数
    this.getTotal();
  },
  toOrder(){
    wx.reLaunch({
      url: '/pages/order/order',
    })
  }
})