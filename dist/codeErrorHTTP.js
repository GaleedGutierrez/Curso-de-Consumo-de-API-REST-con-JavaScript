export const httpCodes = async (img, code) => {
    img.src = `${API_URL}${code}`;
};
const API_URL = 'https://http.cat/';
