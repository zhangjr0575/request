const axios = require('axios');

// 创建axios实例对象
const  axiosInstance = axios.create();

function obj2QS(obj) {
    let qs = '';

    for (let key in obj) {
        qs += `${key}=${obj[key]}&`;
    }
    return qs.slice(0, -1);
}

module.exports = {
    get(url, data, config) {
        let qs = obj2QS(data), joiner = ~url.indexOf("?") ? "&" : "?";

        return new Promise(function(resolve) {
            axiosInstance.get(url + (qs ? (joiner + qs) : ''), config).then(resolve).catch(function (error) {
                // 非200的异常由上层统一处理
                resolve(error.response);
            });
        });
    },
    post(url, data, config) {
        return new Promise(function(resolve) {
            axiosInstance.post(url, data, config).then(resolve).catch(function (error) {
                // 非200的异常由上层统一处理
                resolve(error.response);
            });
        });
    }
};
