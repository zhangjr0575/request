const merge = require('merge');
/**
 * @description 默认提供的response响应拦截
 * @param {object} res response响应体
 * @param {function} abort 结束当前请求
 */
const DEFAULT_PARAMS = {
    dataField: "data",
    errorField: "data",
    httpStatusField: "status"
}
let params = {};

function invok(res, abort) {
    // 请求正常时,保留响应体中的data返回,异常时中断
    if (res[params.httpStatusField] === 200) {
        return res.data;
    } else {
        abort({
            statusText: res.statusText,
            [params.errorField]: res[params.errorField],
            [params.httpStatusField]: res[params.httpStatusField]
        });
    }
}

module.exports = function interceptor(config) {
    params = merge(DEFAULT_PARAMS, config || {});
    return invok;
}
