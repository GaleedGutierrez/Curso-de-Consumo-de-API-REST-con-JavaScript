import { API_URL_FAVORITES, API_URL_RANDOM } from "./api.js";
import { httpCodes } from "./codeErrorHTTP.js";
import { button, errorSection, img1, img2, imgHttpCode, pError } from "./htmlElements.js";
import { ApiCat, ApiCatError } from "./interfaces";

const loadRandomMichis = async (
        imgs: HTMLImageElement[],
        url: string
    ): Promise<void> => {

    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data: ApiCatError = await request.json();
            httpCodes(imgHttpCode, data.status);
            throw new Error(`There was an error. HTTP Code: ${request.status}.`);
        }
        const data: ApiCat[] = await request.json();
        for (let i = 0; i < data.length; i++) {
            imgs[i].src = data[i].url;
        }
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
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
            httpCodes(imgHttpCode, data.status);
            throw new Error(`There was an error. HTTP Code: ${request.status}.`);
        }
        // const data: ApiCat[] = await request.json();
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};

const showErrorSection = (errorSection: HTMLElement) => {
    if (errorSection.classList.contains('hidden')) errorSection.classList.remove('hidden');
};

const thereWasAnErrorMessage = (error: Error) => {
    pError.innerText = error.message;
    console.log(error);
};

const ctoLoadRandomMichis = () => {
    loadRandomMichis(imgs,  API_URL_RANDOM);
};



const imgs = [img1, img2];

button.addEventListener('click', ctoLoadRandomMichis);
loadRandomMichis(imgs,  API_URL_RANDOM);
loadFavoritesMichis(imgs,  API_URL_FAVORITES);
