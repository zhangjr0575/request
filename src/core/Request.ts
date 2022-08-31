/**
 *
 */
import merge from "merge";
import { spliceUrl } from "@/utils";

import Interceptor from "./Interceptor";
import MpWechatAdapter from "../adapters/mp-wechat";
import MpAliyAdapter from "../adapters/mp-alipay";

import AdapterInterface from "../interface/adapter";
import RequestInterface from "../interface/request";
import { RequestConfig, RequestCreateConfig, RequestCoverConfig, RequestResponseBody } from "../interface";

export default class Request implements RequestInterface {
	config: RequestCreateConfig = {
		baseURL: "",
		headers: {},
		timeout: 6000
	};
	interceptors = {
		request: new Interceptor(),
		response: new Interceptor(),
		httpError: new Interceptor()
	};
	adapter: AdapterInterface;
	static adapterMissingMsg = "当前环境没有适合的适配器, 自己实现一个吧~";
	constructor(config?: RequestCreateConfig) {
		this.config = merge(this.config, config || {});
		// @ts-ignore
		if (typeof wx !== "undefined" || typeof uni !== "undefined") {
			this.adapter = new MpWechatAdapter();
			// @ts-ignore
		} else if (typeof my !== "undefined") {
			this.adapter = new MpAliyAdapter();
		} else {
			throw new TypeError(Request.adapterMissingMsg);
		}
	}
	create(config?: RequestCreateConfig): RequestInterface {
		return new Request(config);
	}
	get(url: string, data: Record<string, any>, config: RequestCoverConfig = {}): Promise<RequestResponseBody> {
		return this.request(
			merge({ headers: this.config.headers, timeout: this.config.timeout }, config, { data, method: "get", url: spliceUrl(url, this.config.baseURL) })
		);
	}
	post(url: string, data: Record<string, any>, config: RequestCoverConfig = {}): Promise<RequestResponseBody> {
		return this.request(
			merge({ headers: this.config.headers, timeout: this.config.timeout }, config, { data, method: "post", url: spliceUrl(url, this.config.baseURL) })
		);
	}
	async request(params: RequestConfig): Promise<RequestResponseBody> {
		try {
			if (!this.adapter) return Promise.reject(Request.adapterMissingMsg);
			// 请求前拦截
			const _params: RequestConfig = await Interceptor.exe(this.interceptors.request.handlers, params);
			// 发起请求
			const [error, response] = await this.adapter.request(_params);
			// 异常拦截和普通响应拦截分开处理
			if (error) {
				return Promise.reject(await Interceptor.exe(this.interceptors.httpError.handlers, error));
			} else {
				return Promise.resolve(await Interceptor.exe(this.interceptors.response.handlers, response as RequestResponseBody));
			}
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
