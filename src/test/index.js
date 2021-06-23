const Fetch = require("../core/request.js");

const request = new Fetch({
    baseURL: 'http://api.test.edu.fenqichaoren.com/human_api',
    headers: {
        "Token": "用户token"
    }
});

/**
 * @description 自定义请求发送前拦截,非必选项
 * @param requestConfig 发送的请求配置信息
 * @param abort 调用方法可中断本次请求
 */
request.interceptor.request(function(requestConfig, abort) {
    // TODU
    return requestConfig;
});

/**
 * @description 自定义请求响应后拦截,非必选项
 * @param res 响应体
 * @param abort 调用方法可中断本次请求
 */
request.interceptor.response(function(res, abort) {
    // TODU
    return res;
});

/**
 * @description 使用默认提供的响应拦截器
 * @param res 响应体
 * @param abort 调用方法可中断本次请求
 * responseInterceptor可传入 {dataField, httpStatusField, errorField}分别配置响应有效的数据包字段,以及响应失败的数据包字段
 */
request.interceptor.response(Fetch.responseInterceptor());

// 接口测试请求
request.get('/index', {
    year: 2021,
    month: 10,
    day: 15,
    hour: 6,
    minute: 20,
    second: 11,
}).then(res => {
    console.log("业务代码收到数据包:", res);
}).catch(error => {
    console.log("请求失败", error.data);
});
