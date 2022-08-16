// token.js
import Base from "./base";
const base = new Base();
class Token {
  getToken() {
    wx.login({
      success: async (res) => {
        const data = await base.request(
          "token/user",
          { code: res.code },
          "POST"
        );
        console.log("令牌", data);
        // 将令牌保存在本地
        wx.setStorageSync("token", data.token);
      },
    });
  }
  // 验证令牌
  async verifyToken(token) {
    const res = await base.request("token/verify", { token }, "POST");
    if (!res.isValid) {
      // 令牌已过期或无效需要重新获取
      this.getToken();
    }
  }
}
export default Token;
