import { API_URL_FAVORITES, API_URL_FAVORITE_DELETE, API_URL_RANDOM } from "./api.js";
import { errorRequest} from "./errors.js";
import { errorSection, pError, imgs, buttonFavorite2, buttonFavorite1, addFirstKittyParagraph, sectionFavoriteMichis } from "./htmlElements.js";
import { ApiCat, ApiFavoriteCat } from "./interfaces";

export const loadRandomMichis = async (imgs: HTMLImageElement[], url: string): Promise<void> => {
    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data = await errorRequest(request);
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

export const loadFavoriteMichis = async (url: string): Promise<void> => {
    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data = await errorRequest(request);
            throw new Error(`There was an error.
            HTTP Code: ${request.status}.
            Message: ${data.message}.`
            );
        }
        const data: ApiFavoriteCat[] = await request.json();
        if (data.length !== 0) addFirstKittyParagraph.classList.add('hidden');
        if (data.length === 0) addFirstKittyParagraph.classList.remove('hidden');
        sectionFavoriteMichis.innerHTML = '';
        showFavoritesMichis(data);
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};

export const saveFavoriteMichi = async (url: string, id: string) => {
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
            const data = await errorRequest(request);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`
            );
        }
        loadFavoriteMichis(API_URL_FAVORITES);
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

        button.onclick = () => deleteFavoriteMichi(API_URL_FAVORITE_DELETE(data[i].id));
    }
};

const deleteFavoriteMichi = async (url: string) => {
    try {
        const request = await fetch(url, {
            method: 'DELETE',
        });
        if (request.status !== 200) {
            const data = await errorRequest(request);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`
            );
        }
        loadFavoriteMichis(API_URL_FAVORITES);
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
loadFavoriteMichis(API_URL_FAVORITES);
