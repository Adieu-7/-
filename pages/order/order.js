// pages/order/order.js
import Base from "../../utils/base";
import Address from "../../utils/address";
const base = new Base();
const address = new Address();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
     // 从服务器获取默认收货地址
     const addressInfo = await address.getAddress();
     this.setData({ addressInfo });
     // 获取订单数据
     this.getOrderData();
  },

  // 去付款逻辑
  onPay() {
    // 若没有填写收货地址需要给提示
    if (!this.data.addressInfo) {
      this._showTips("下单提示", "请填写您的收货地址");
      return;
    }
    // 生成订单
    this.createOrder();
  },

  async createOrder() {
    // 先组装往后台发送的数据
    const products = this.data.orderData.map((item) => {
      return {
        product_id: item.id,
        cou: item.cou,
      };
    });
    const res = await base.request("order", { products }, "POST");
    console.log("订单", res);
    if (res.pass) {
      // 订单成功创建---发起支付
      const orderInfo = await base.request(
        "pay/pre_order",
        { id: res.order_id },
        "POST"
      );
      console.log("订单信息", orderInfo);
      // orderInfo包含支付参数
      wx.requestPayment({
        nonceStr: orderInfo.a,
        package: orderInfo.b,
        paySign: "paySign",
        timeStamp: "timeStamp",
      });
    } else {
      // 订单创建失败---提示用户
      this.orderFail(res);
    }
  },
  // 处理订单失败的逻辑
  orderFail(res) {
    console.log(res);
    // ①先拿到当前订单里面的商品
    const orderProducts = res.pStatusArray;
    // ②选择出来所有缺货的商品
    const noStocks = orderProducts.filter((item) => {
      return !item.haveStock;
    });
    // ③拿到缺货商品的名字
    const nameArr = noStocks.map((item) => {
      return item.name;
    });
    // ④提示文字：情况1：一件或两件商品缺货直接提示；情况2：多于两件商品缺货，提示前两件等缺货
    let tips = "";
    if (nameArr.length <= 2) {
      tips = nameArr.join("、");
    } else {
      tips = nameArr[0] + "、" + nameArr[1] + "等";
    }
    tips += "缺货";
    this._showTips("下单失败", tips);
  },

  // 封装函数显示弹窗
  _showTips(title, content) {
    wx.showModal({
      title,
      content,
      showCancel: false,
    });
  },

  getOrderData() {
     // 拿到购物车所有数据
     const cartData = wx.getStorageSync("cart");
     // 筛选要买的商品
     const orderData = cartData.filter((item) => {
       return item.status;
     });
     // 把订单商品绑定到页面上
     this.setData({ orderData });
  },

  //添加用户收货地址
  async onAddress() {
    const res = await wx.chooseAddress();
    console.log("收货地址", res);
    // 将当前选中的地址渲染到页面上
    const addressInfo = await address._bindAddress(res);
    this.setData({ addressInfo });

    // 将当前选中的地址上传至服务器
    base.request(
      "address",
      {
        name: res.userName,
        mobile: "13512345678",
        province: res.provinceName,
        city: res.cityName,
        country: res.countyName,
        detail: res.detailInfo,
      },
      "POST"
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
