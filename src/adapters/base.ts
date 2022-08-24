import {
  RequestCreateConfig,
  RequestAliasConfig,
  ResponseBodyNormal,
  ResponseErrorNormal,
} from "@/interface/config";

import merge from "merge";
import { spliceUrl } from "@/utils";

import Interceptor from "@/helper/interceptor";
// import MpalipayAdapter from "@/adapters/mp-alipay";

// 参数字段修正清单
const requestParamFieldFix: Record<string, any> = {
  headers: "header",
};

export default class Request {
  config: RequestCreateConfig = {
    baseURL: "",
    headers: {},
    timeout: 6000,
  };
  interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
    httpError: new Interceptor(),
  };
  constructor(config?: RequestCreateConfig) {
    // @ts-ignore
    if (typeof uni || typeof wx) {
      this.config = merge(this.config, config || {});
    } else {
      throw new Error(`[request error] 请在uni-app、微信小程序内运行`);
    }
  }
  // prettier-ignore
  async get(url: string, data?: any, config: RequestAliasConfig = {}): Promise<ResponseBodyNormal | ResponseErrorNormal> {
    const interceptors = this.interceptors;
    // 执行请求拦截器
    return Interceptor.exe(interceptors.request.handlers, this.mergeParams(url, "GET", data, config)).then(function (params: any) {
      return Request.doRequest(params).then(function (res: [any, any]) {
        let response = res[1], handlers = interceptors.response.handlers;
        // 执行响应拦截器
        if (res[0]) {
          response = res[0];
          handlers = interceptors.httpError.handlers;
        }
        return Interceptor.exe(handlers, response);
      });
    });
  }
  // prettier-ignore
  async post(url: string, data?: any, config: RequestAliasConfig = {}): Promise<ResponseBodyNormal | ResponseErrorNormal> {
    const interceptors = this.interceptors;
    // 执行请求拦截器
    return Interceptor.exe(interceptors.request.handlers, this.mergeParams(url, "POST", data, config)).then(function (params: any) {
      return Request.doRequest(params).then(function (res: [any, any]) {
        let response = res[1], handlers = interceptors.response.handlers;
        // 执行响应拦截器
        if (res[0]) {
          response = res[0];
          handlers = interceptors.httpError.handlers;
        }
        return Interceptor.exe(handlers, response);
      });
    });
  }
  // prettier-ignore
  mergeParams(url: string, method: "POST" | "GET", data?: any, config?: RequestAliasConfig): Record<string, any> {
    return merge(
      { headers: this.config.headers, timeout: this.config.timeout },
      config || {},
      { data, method, url: spliceUrl(url, this.config.baseURL) }
    );
  }
  // prettier-ignore
  static async doRequest(params: Record<string, any>): Promise<[ResponseErrorNormal | void, ResponseBodyNormal | void]> {
    const _params = { ...params }, _Promise = new Promise<[ResponseErrorNormal | void, ResponseBodyNormal | void]>((resolve) => {
        _params.success = function (res: any) {
          resolve([undefined, Request.normalRequestBody(res)]);
        };
        _params.fail = function (err: any) {
          resolve([Request.normalRequestError(err), undefined]);
        };
      });
    for (let field in requestParamFieldFix) {
      _params[requestParamFieldFix[field]] = _params[field];
      delete _params[field];
    }
    // @ts-ignore
    const request = (uni || wx).request(_params);
    // @ts-ignore 挂载abort方法
    _Promise.abort = request.abort;

    return _Promise;
  }
  static normalRequestBody(res: Record<string, any>): ResponseBodyNormal {
    return { data: res.data, headers: res.header, statusCode: res.statusCode };
  }
  static normalRequestError(err: Record<string, any>): ResponseErrorNormal {
    return { errCode: 0, errMsg: err.errMsg };
  }
}
