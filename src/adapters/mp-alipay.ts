/**
 * uni-app适配器
 */
import Request from '@/main';
import { ResponseBodyNormal, ResponseErrorNormal } from '@/interface/config';

export default class MpalipayAdapter extends Request {
	static async doRequest(params: Record<string, any>): Promise<ResponseBodyNormal> {
		// prettier-ignore
		const _params = { ...params }, _Promise = new Promise<ResponseBodyNormal>((resolve, reject) => {
			_params.success = function (res: any) {
				resolve(Request.normalRequestBody(res));
			};
			_params.fail = function (err: any) {
				reject(Request.normalRequestError(err));
			};
		});
		// @ts-ignore
		const request = my.request(_params);
		// @ts-ignore 挂载abort方法
		_Promise.abort = request.abort;

		return _Promise;
	}
	static normalRequestBody(res: Record<string, any>): ResponseBodyNormal {
		return { data: res.data, headers: res.headers, statusCode: res.status };
	}
	static normalRequestError(err: Record<string, any>): ResponseErrorNormal {
		return { errCode: err.error, errMsg: err.errorMessage };
	}
}
