http请求工具，封装微信小程序、支付宝小程序、uni-app的request请求使其可以实现类似axios的调用方式

### 实现情况

- [ ] 微信小程序
- [ ] 支付宝小程序
- [ ] uni-app

### 创建一个公用的请求实例

```js
import Fetch from '@/zhangjr0575/request';
// 实例化支持baseURL, headers以及timeout
const request = new Fetch({
    baseURL: 'http://wthrcdn.etouch.cn'
});
```

### 添加一个请求拦截器

拦截器我们可以创建多个，因为我们并没有限制允许设置的拦截器的上限数量

```js
request.interceptors.request.use(function(config) {
    // TODU
    return config;
});

```

当我们返回一个false或则Promise.reject()时，当前请求将会被终止

```js
request.interceptors.request.use(function(config) {
    return Promise.reject();
});

```

### 添加一个响应拦截器

响应体内容统一类型格式为`{data: any; headers: Record<string, string>; statusCode: number}`

```js
request.interceptors.httpError.use(function(res) {
    // TODU
    return res;
});
```

### 添加一个异常拦截器

任何非200的http请求状态将会在这里被监听到，
异常内容统一类型格式为`{errCode: number; errMsg: string}`

```js
request.interceptors.response.use(function(res) {
    // TODU
    return res;
});
```

### 发起一个http请求

```js
request.get('/weather_mini1', { city: '成都' }).then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
});
```

### 移除一个拦截器

当我们添加一个拦截器后会返回一个值, 此时我们可以记录这个值并使用eject在适当的时候移除这个拦截器

```js
const interceptorId = request.interceptors.response.use(function(res) {
    // TODU
    return res;
});
// TODU
request.interceptors.response.eject(interceptorId);
```
