// components/product/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product:Object,
  },
  options:{
    //样式隔离
    styleIsolation:"shared",
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    // 跳转详情页
    toDetail(e){
      wx.navigateTo({
        url: '/pages/details/details?id='+this.data.product.id,
      });
    }
  }
})
