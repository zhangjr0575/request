const merge = require('merge');
const adapter = require('./adapter');
const httpCode = require('../config/httpCode');
const getFullURL = require('../helper/getFullURL');
const interceptor = require('../helper/interceptor');

const DEFAULT_PARAMS = {

}, staticAsset = {
    beforeRequest(url, data = {}, config = {}) {
        return new Promise(async (resolve, reject) => {
            let isAbort = false, _opt = {
                ...config,
                data,
                url: getFullURL(url, this.options.baseURL || '')
            };
            typeof staticAsset.requestInterceptor === "function" && (_opt = await staticAsset.requestInterceptor(_opt, function(err) {
                isAbort= true; reject(err);
            }) || _opt);
            !isAbort && resolve(_opt);
        });
    },
    afterResponse(res) {
        return new Promise(async (resolve, reject) => {
            let isAbort = false;
            // 跟新httpCode的释义
            res.statusText = httpCode[res.status];
            // 执行存在的响应拦截
            typeof staticAsset.responseInterceptor === "function" && (res = await staticAsset.responseInterceptor(res, function(err) {
                isAbort= true; reject(err);
            }) || res);
            !isAbort && resolve(res);
        });
    }
}

// const
class Interceptor {
    request(callback) {
        typeof callback === "function" && (staticAsset.requestInterceptor = callback);
    }
    response(callback) {
        typeof callback === "function" && (staticAsset.responseInterceptor = callback);
    }
}

class Fetch {
    constructor(config) {
        this.options = merge(DEFAULT_PARAMS, config);

        this.interceptor = new Interceptor();
    }
    post(url, data, config) {
        return staticAsset.beforeRequest.call(this, url, data, config).then(function (options) {
            const {url, data} = options;
            delete options.url;
            delete options.data;

            return adapter.post(url, data, options.config).then(staticAsset.afterResponse.bind(this));
        });
    }
    get(url, data, config) {
        return staticAsset.beforeRequest.call(this, url, data, config).then(function (options) {
            console.log("请求前通过");
            const {url, data} = options;
            delete options.url;
            delete options.data;

            return adapter.get(url, data, options.config).then(staticAsset.afterResponse.bind(this));
        });
    }
}
// 挂载默认定制的response拦截器
Fetch.responseInterceptor = interceptor;

module.exports = Fetch;
