export type RequestMethod = {
	POST: 'POTS';
	GET: 'GET';
};

export type RequestCreateConfig = {
	baseURL?: string;
	timeout?: number;
	headers?: Record<string, string>;
};

export type RequestConfig = {
	url: string;
	data?: any;
	method?: RequestMethod;
	headers?: Record<string, string>;
	timeout?: number;
	dataType?: string;
};

export type RequestAliasConfig = Pick<RequestConfig, 'headers' | 'timeout' | 'dataType'>;

export type ResponseBodyNormal = {
	data: any;
	headers: any;
	statusCode: number;
};

export type ResponseErrorNormal = {
	errCode: number;
	errMsg: string;
};
