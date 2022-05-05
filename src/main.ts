import { ApiCat, ApiCatError } from "./interfaces";

const loadRandomMichis = async (
        imgs: HTMLImageElement[],
        url: string
    ): Promise<void> => {

    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data: ApiCatError = await request.json();
            throw new Error(`There was an error. Status: ${request.status}. Message: ${data.message}`);
        }
        const data: ApiCat[] = await request.json();
        for (let i = 0; i < data.length; i++) {
            imgs[i].src = data[i].url;
        }
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
    }
};

const loadFavoritesMichis = async (
        imgs: HTMLImageElement[],
        url: string
    ): Promise<void> => {
    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data: ApiCatError = await request.json();
            throw new Error(`There was an error. Status: ${request.status}. Message: ${data.message}`);
        }
        const data: ApiCat[] = await request.json();
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
    }
};

const thereWasAnErrorMessage = (error: Error) => {
    pError.innerText = error.message;
    console.log(error);
};

const ctoLoadRandomMichis = () => {
    loadRandomMichis(imgs,  API_URL_RANDOM);
};

// DOM section
const img1 = document.getElementById('random-michis__img-cat-1-id') as HTMLImageElement;
const img2 = document.getElementById('random-michis__img-cat-2-id') as HTMLImageElement;
// const img3 = document.getElementById('random-michis__img-cat-3-id') as HTMLImageElement;
// const img4 = document.getElementById('random-michis__img-cat-4-id') as HTMLImageElement;
const button = document.getElementById('main__button-refresh-id') as HTMLButtonElement;
const pError = document.getElementById('main__error-id') as HTMLParagraphElement;

// API section
const API = 'https://api.thecatapi.com/v1/';
const API_KEY = 'd0bb4eed-2aec-4eaa-8ad7-2639796348e8';
const API_URL_RANDOM = `${API}images/search?limit=2&api_key=${API_KEY}`;
const API_URL_FAVORITES = `${API}favourites?limit=2`;

const imgs = [img1, img2];

button.addEventListener('click', ctoLoadRandomMichis);
loadRandomMichis(imgs,  API_URL_RANDOM);
loadFavoritesMichis(imgs,  API_URL_FAVORITES);
