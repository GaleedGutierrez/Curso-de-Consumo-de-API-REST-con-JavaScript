import { imgHttpCode } from "./htmlElements.js";
export const httpCodes = async (img, code) => {
    img.src = `${API_URL}${code}`;
};
export const errorRequest = async (request) => {
    const data = await request.json();
    httpCodes(imgHttpCode, data.status);
    return data;
};
const API_URL = 'https://http.cat/';
