/**
 * 适配器模板
 */
import { RequestConfig, RequestResponseBody, RequestResponseError } from "./index";

export type AdapterRequestResponse = [RequestResponseError, void] | [void, RequestResponseBody];

export default interface Adapter {
	request(params: RequestConfig): Promise<AdapterRequestResponse>;
}
