import Fetch from "../src/main";
// @ts-ignore
// import Fetch from '../dist';

const request = Fetch.create({
  baseURL: "http://wthrcdn.etouch.cn",
  headers: {},
});

function toTuple<T>(arg: T): [T] {
  return [arg];
}

toTuple(12);

test("[axios adapter] require导入", function () {
  expect(request);
});

describe("[axios adapter] 接口请求测试", () => {
  test("检查数据包是否标准", function (done) {
    // prettier-ignore
    request.get('/weather_mini', { city: '南京' }).then((res: any) => {
			expect('data' in res).toBeTruthy();
			expect('headers' in res).toBeTruthy();
			expect('statusCode' in res).toBeTruthy();
			done();
		});
  });
  test("异常捕获", function (done) {
    // prettier-ignore
    expect(
			request.get('/weather_mini1', { city: '南京' }).then(() => {
				// console.log(res);
			}).catch((error: any) => {
				expect(error);
				done();
			})
		);
  });
});
