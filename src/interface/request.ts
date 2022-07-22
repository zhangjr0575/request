/**
 * 适配器类型约束
 */

import { RequestCreateConfig, RequestAliasConfig, ResponseBodyNormal, ResponseErrorNormal } from './config';

export interface Request {
	get(url: string, data?: any, config?: RequestAliasConfig): Promise<ResponseBodyNormal | ResponseErrorNormal>;
	post(url: string, data?: any, config?: RequestAliasConfig): Promise<ResponseBodyNormal | ResponseErrorNormal>;
}
