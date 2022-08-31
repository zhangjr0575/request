export type RequestMethod = {
	POST: "POTS";
	GET: "GET";
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

export type RequestCoverConfig = Pick<RequestConfig, "headers" | "timeout" | "dataType">;

export type RequestResponseBody = {
	data: any;
	headers: any;
	statusCode: number;
};

export type RequestResponseError = {
	errCode: number;
	errMsg: string;
};

export type RequestResponse = [void | RequestResponseError, void | RequestResponseError];
