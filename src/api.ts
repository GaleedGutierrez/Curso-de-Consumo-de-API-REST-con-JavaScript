// API section
const API = 'https://api.thecatapi.com/v1';
export const API_KEY = 'd0bb4eed-2aec-4eaa-8ad7-2639796348e8';
export const API_URL_RANDOM = `${API}/images/search?limit=2`;
export const API_URL_FAVORITES = `${API}/favourites`;
export const API_URL_IMG_UPLOAD = `${API}/images/upload`;
export const API_URL_FAVORITE_DELETE = (id: number): string => `${API}/favourites/${id}`;
