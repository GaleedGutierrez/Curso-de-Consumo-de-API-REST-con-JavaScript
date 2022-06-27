import { imgHttpCode } from "./htmlElements.js";
export const httpCodes = async (img, code) => {
    debugger;
    img.src = `${API_URL}/${code}`;
};
// para Fetch
export const errorResponse = async (response) => {
    const data = await response.json();
    httpCodes(imgHttpCode, data.status);
    return data;
};
const API_URL = 'https://http.cat';
