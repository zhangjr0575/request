/**
 * 微信小程序适配器实现, un-app共用
 */
import { RequestConfig } from "../interface";

import Adapter, { AdapterRequestResponse } from "../interface/Adapter";

type ErrorBody = { errMsg: string };
type SuccessBody = { data: any; header: any; statusCode: number };

export default class MpWechatAdapter implements Adapter {
	request(params: RequestConfig): Promise<AdapterRequestResponse> {
		return new Promise<AdapterRequestResponse>(function (resolve) {
			// @ts-ignore
			const _params = {
				...params,
				success(res: SuccessBody) {
					resolve([void 0, { data: res.data, headers: res.header, statusCode: res.statusCode }]);
				},
				fail(err: ErrorBody) {
					resolve([{ errCode: 0, errMsg: err.errMsg }, void 0]);
				}
			};
			// @ts-ignore
			(wx || uni).request(_params);
		});
	}
}
