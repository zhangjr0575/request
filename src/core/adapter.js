/**
 * @description 获取当前环境的request适配器
 * @version 1.0.0
 */
function getAdpter() {
    // 是否是uni-app
    if (typeof uni !== "undefined") {
        return require('../adapters/uni-app.js');
    } else if (typeof wx !== "undefined") {
        return require('../adapters/mp-wx.js');
    } else if (typeof my !== "undefined") {
        return require('../adapters/mp-alipay.js');
    } else {
        return require('../adapters/axios.js');
    }
}

module.exports = getAdpter();
