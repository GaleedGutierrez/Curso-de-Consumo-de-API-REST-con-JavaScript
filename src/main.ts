import { API_URL_FAVORITES, API_URL_RANDOM } from "./api.js";
import { httpCodes } from "./codeErrorHTTP.js";
import { errorSection, imgHttpCode, pError, imgs, buttonFavorite2, buttonFavorite1, addFirstKittyParagraph } from "./htmlElements.js";
import { ApiCat, ApiCatError, ApiFavoriteCat } from "./interfaces";

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
        buttonFavorite1.onclick = () => saveFavoriteMichi(API_URL_FAVORITES, data[0].id);
        buttonFavorite2.onclick = () => saveFavoriteMichi(API_URL_FAVORITES, data[1].id);
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
        const data: ApiFavoriteCat[] = await request.json();
        if (data.length !== 0) addFirstKittyParagraph.classList.add('hidden');
        showFavoritesMichis(data);
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};

export const saveFavoriteMichi = async (
        url: string,
        id: string
    ) => {
    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: id
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

const showFavoritesMichis = (data: ApiFavoriteCat[]) => {
    for (let i = 0; i < data.length; i++) {
        const section = document.getElementById('favorites-michis__michis-container-id');
        const article = document.createElement('article');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const buttonText = document.createTextNode('Delete Michi');
        article.classList.add('main__article-container');
        figure.classList.add('main__figure-img');
        button.classList.add('button');
        img.classList.add('main__imgs-cats');
        img.src = data[i].image.url;
        img.alt = 'Your favorite cat';

        button.appendChild(buttonText);
        figure.appendChild(img);
        article.appendChild(figure);
        article.appendChild(button);
        section?.appendChild(article);
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
loadFavoriteMichis(API_URL_FAVORITES);
