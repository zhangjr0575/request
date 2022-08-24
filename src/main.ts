import baseAdapter from "./adapters/base";

import alipayAdapter from "./adapters/mp-alipay";
// @ts-ignore
export default typeof my ? alipayAdapter : baseAdapter;
