import { API_URL_RANDOM } from "./api.js";
import { httpCodes } from "./codeErrorHTTP.js";
import { errorSection, imgHttpCode, pError, imgs } from "./htmlElements.js";
import { ApiCat, ApiCatError } from "./interfaces";

export const loadRandomMichis = async (
        imgs: HTMLImageElement[],
        url: string
    ): Promise<void> => {

    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data: ApiCatError = await request.json();
            httpCodes(imgHttpCode, data.status);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`
            );
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

export const loadFavoriteMichis = async (
        url: string
    ): Promise<void> => {
    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data: ApiCatError = await request.json();
            httpCodes(imgHttpCode, data.status);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`
            );
        }
        const data: ApiCat[] = await request.json();
        console.log('Favorites', data);
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};

export const saveFavoriteMichis = async (
        url: string
    ) => {
    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: '9ccXTANkb'
            }),
        });
        if (request.status !== 200) {
            const data: ApiCatError = await request.json();
            httpCodes(imgHttpCode, data.status);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`
            );
        }
        // const data: ApiCat[] = await request.json();
        console.log('Save', request);
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


loadRandomMichis(imgs,  API_URL_RANDOM);
