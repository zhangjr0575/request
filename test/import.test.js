const Fetch = require("../src/core/request.js");

const request = new Fetch({
    baseURL: 'http://api.test.edu.fenqichaoren.com/human_api',
    headers: {}
});

test('测试require导入是否正常', function() {
    expect(request);
});

test('测试接口请求', function() {
    expect(request.get('/index', {
        year: 2021,
        	month: 10,
        	day: 15,
        	hour: 6,
        	minute: 20,
        	second: 11,
    }).then(res => {
        console.log(res);
    }));
});
