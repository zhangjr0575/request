/**
 * 支付宝小程序适配器
 */
import Request from "./base";
import { ResponseBodyNormal, ResponseErrorNormal } from "@/interface/config";

export default class MpalipayAdapter extends Request {
  // prettier-ignore
  static async doRequest(params: Record<string, any>): Promise<[ResponseErrorNormal | void, ResponseBodyNormal | void]> {
    const _params = { ...params }, _Promise = new Promise<[ResponseErrorNormal | void, ResponseBodyNormal | void]>((resolve, reject) => {
        _params.success = function (res: any) {
          resolve([undefined, MpalipayAdapter.normalRequestBody(res)]);
        };
        _params.fail = function (err: any) {
          resolve([MpalipayAdapter.normalRequestError(err), undefined]);
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
