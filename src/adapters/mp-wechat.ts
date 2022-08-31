/**
 * 微信小程序适配器实现, un-app共用
 */
import { objFieldConvert } from "@/utils";
import { RequestConfig } from "../interface";

import Adapter, { AdapterRequestResponse } from "../interface/Adapter";

type ErrorBody = { errMsg: string };
type SuccessBody = { data: any; header: any; statusCode: number };

export default class MpWechatAdapter implements Adapter {
	static fieldConvertMap = {
		headers: "header"
	};
	request(params: RequestConfig): Promise<AdapterRequestResponse> {
		return new Promise<AdapterRequestResponse>(function (resolve) {
			const _params = {
				...objFieldConvert(params, MpWechatAdapter.fieldConvertMap),
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
