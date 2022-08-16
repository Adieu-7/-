// components/cartItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cart:Object,
    isDisabled:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    noselect: "/imgs/icon/circle@noselected.png",
    select: "/imgs/icon/circle@selected.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // +按钮
    onAdd(){
      // 先获取当前操作商品的id
      const id=this.properties.cart.id;
      // 通知页面我点击了+按钮
      this.triggerEvent("changeCounts",{id,type:"add"});
    },
    // -按钮
    onCut(){
      const id=this.properties.cart.id;
      this.triggerEvent("changeCounts",{id,type:"cut"});
    },
    // 删除键
    onDel(){
      const id=this.properties.cart.id;
      this.triggerEvent("del",{id});
    },
    onSelect(){
      const id=this.properties.cart.id;
      this.triggerEvent("changeCounts",{id,type:"select"});
    },
  }
})
