// app.js
import Token from "./utils/token";
const token = new Token();
App({
  onLaunch() {
    // 先尝试获取令牌
    const tokenStr = wx.getStorageSync("token");
    if (tokenStr) {
      // 需要验证该令牌是否有效
      token.verifyToken(tokenStr);
    } else {
      // 没有令牌需要登录小程序获取身份令牌
      token.getToken();
    }
  },
});
