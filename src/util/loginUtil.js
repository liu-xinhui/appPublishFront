const USER_INFO = "hold_user_info";
const storage = window.localStorage;
let userInfo = null;
export const adminUserId = 1;
export default {
  login(obj) {
    userInfo = obj;
    storage.setItem(USER_INFO, JSON.stringify(obj));
  },
  logout() {
    userInfo = null;
    storage.clear();
  },
  isLogin() {
    return !!this.getToken();
  },
  getUserInfo() {
    try {
      if (!userInfo) {
        userInfo = JSON.parse(storage.getItem(USER_INFO));
      }
    } catch (err) {
      console.log(err);
    }
    return userInfo || {};
  },
  getToken() {
    return this.getUserInfo().token;
  },
  getUsername() {
    return this.getUserInfo().userName;
  },
  getUserId() {
    return this.getUserInfo().userID;
  },
  hasAuth(authName) {
    //admin默认用于所有权限
    return (this.getUserId() === adminUserId) || (this.getUserInfo().permissions || []).indexOf(authName) > -1;
  },
};
