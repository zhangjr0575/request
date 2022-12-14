/**
 * 支付宝小程序适配器实现
 */
import { RequestConfig } from "../interface";

import Adapter, { AdapterRequestResponse } from "../interface/Adapter";

type ErrorBody = { error: number; errorMessage: string };
type SuccessBody = { data: any; headers: any; status: number };

export default class MpAliyAdapter implements Adapter {
	request(params: RequestConfig): Promise<AdapterRequestResponse> {
		return new Promise<AdapterRequestResponse>(function (resolve) {
			// @ts-ignore
			const _params = {
				...params,
				success(res: SuccessBody) {
					resolve([void 0, { data: res.data, headers: res.headers, statusCode: res.status }]);
				},
				fail(err: ErrorBody) {
					resolve([{ errCode: err.error, errMsg: err.errorMessage }, void 0]);
				}
			};
			// @ts-ignore
			my.request(_params);
		});
	}
}
