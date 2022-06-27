import { imgHttpCode } from "./htmlElements.js";
import { ApiCatError } from "./interfaces.js";

export const httpCodes = async (img: HTMLImageElement, code: number) => {
    debugger
    img.src = `${API_URL}/${code}`;
};

// para Fetch

export const errorResponse = async (response: Response): Promise<ApiCatError> => {
    const data: ApiCatError = await response.json();
    httpCodes(imgHttpCode, data.status);
    return data;
};

const API_URL = 'https://http.cat';
