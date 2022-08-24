/**
 * 拦截器
 */
import { hasRepeatRecordItem } from "@/utils";

interface Callback {
  <T>(arg: T): T | Promise<T> | false;
}

export default class Interceptor {
  handlers: Callback[] = [];
  use(callback: Callback) {
    if (
      typeof callback === "function" &&
      !hasRepeatRecordItem(this.handlers, callback)
    ) {
      return this.handlers.push(callback) - 1;
    }
  }
  eject(id: number) {
    if (this.handlers[id]) {
      return this.handlers.splice(id, 1)[0];
    }
  }
  static async exe<T>(handlers: Function[], data: T): Promise<T> {
    let _data = { ...data };
    try {
      for (let index in handlers) {
        _data = await handlers[index](_data || data);
        // @ts-ignore 返回false时无效
        if (_data === false) return Promise.reject(data);
      }
      return Promise.resolve(_data || data);
    } catch (err: any) {
      console.log("不活到异常信息", err);
      return Promise.reject(data);
    }
  }
}
