import { imgHttpCode } from "./htmlElements.js";
import { ApiCatError } from "./interfaces.js";

export const httpCodes = async (img: HTMLImageElement, code: number) => {
    img.src = `${API_URL}${code}`;
};

export const errorRequest = async (request: Response): Promise<ApiCatError> => {
    const data: ApiCatError = await request.json();
    httpCodes(imgHttpCode, data.status);
    return data;
};

const API_URL = 'https://http.cat/';
