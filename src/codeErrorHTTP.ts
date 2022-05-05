export const httpCodes = async (img: HTMLImageElement, code: number) => {
    img.src = `${API_URL}${code}`;
};

const API_URL = 'https://http.cat/';
