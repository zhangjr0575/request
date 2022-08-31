/**
 * 请求接口
 */

import { RequestConfig, RequestCreateConfig, RequestCoverConfig, RequestResponse, RequestResponseBody, RequestResponseError } from "./index";

export default interface Request {
	create(config: RequestCreateConfig): Request;
	get(url: string, data?: any, config?: RequestCoverConfig): Promise<RequestResponseBody | RequestResponseError>;
	post(url: string, data?: any, config?: RequestCoverConfig): Promise<RequestResponseBody | RequestResponseError>;
	request(params: RequestConfig): Promise<RequestResponseBody | RequestResponseError>;
}
