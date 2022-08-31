/**
 * 工具包函数
 */

/**
 * 判断一个url地址是否是http链接
 * @param url 待检查的url地址
 * @return 链接是否合法的boolean值
 */
export function isHttpUrl(url: string): boolean {
	return /^http(s)?:\/\//.test(url);
}

/**
 * 将url拼接上基础路径
 * @param url 待拼接的url
 * @param baseURL url基础路径拼接
 */
export function spliceUrl(url: string, baseURL?: string) {
	if (isHttpUrl(url) || !baseURL) return url;

	return `${baseURL.replace(/\/$/, "")}/${baseURL.replace(/^\//, "")}`;
}

/**
 * 检查是否含有重复记录项
 * @param records 待检查的记录
 * @param target 待检查的元素
 * @returns boolean
 */
export function hasRepeatRecordItem(records: Record<number, any>, target: any) {
	for (let key in records) {
		if (records[key] === target) return true;
	}
	return false;
}

/**
 * 对象字段名转换
 * @param obj 待转换的对象
 * @param convertMap 字段转换映射表
 * @return Record<string, any> 返回原对象
 */
export function objFieldConvert<T>(obj: T, convertMap: Record<string, string>): T {
	for (let key in convertMap) {
		if (key in obj) {
			obj[convertMap[key]] = obj[key];
			delete obj[key];
		}
	}
	return obj;
}
