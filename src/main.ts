import { API_URL_FAVORITES, API_URL_FAVORITE_DELETE, API_URL_RANDOM, API_KEY } from "./api.js";
import { errorRequest} from "./errors.js";
import { errorSection, pError, imgs, buttonFavorite2, buttonFavorite1, addFirstKittyParagraph, sectionFavoriteMichis, form } from "./htmlElements.js";
import { ApiCat, APICatUpload, ApiFavoriteCat } from "./interfaces";

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

const loadFavoriteMichis = async (url: string): Promise<void> => {
    try {
        const request = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            }
        });
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

const saveFavoriteMichi = async (url: string, id: string): Promise<void> => {
    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
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

const showFavoritesMichis = (data: ApiFavoriteCat[]): void => {
    const toRender: HTMLElement[] = [];
    const section = document.getElementById('favorites-michis__michis-container-id');

    for (let i = 0; i < data.length; i++) {
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

        button.append(buttonText);
        figure.append(img);
        article.append(figure, button);
        toRender.push(article);

        button.onclick = () => deleteFavoriteMichi(API_URL_FAVORITE_DELETE(data[i].id));
    }

    section?.append(...toRender);
};

const deleteFavoriteMichi = async (url: string): Promise<void> => {
    try {
        const request = await fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY,
            }
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

const showErrorSection = (errorSection: HTMLElement): void => {
    if (errorSection.classList.contains('hidden')) errorSection.classList.remove('hidden');
};

const thereWasAnErrorMessage = (error: Error): void => {
    pError.innerText = error.message;
    console.log(error);
};

export const uploadMichiPhoto = async (url: string): Promise<void> => {
    const formData = new FormData(form);
    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
            },
            body: formData
        });
        if (request.status !== 201) {
            const data = await errorRequest(request);
            throw new Error(`There was an error.
            HTTP Code: ${request.status}.
            Message: ${data.message}.`
            );
        }
        const data: APICatUpload = await request.json();
        saveFavoriteMichi(API_URL_FAVORITES, data.id);
    } catch (error) {
        if (error instanceof Error) thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};

export const showThumbnail = () => {
    const img = document.getElementById('uploadingMichi__img-id') as HTMLImageElement;
    const formData = new FormData(form);
    const reader = new FileReader();
    const file = formData.get('file') as File;
    reader.readAsDataURL(file);
    // console.log(file);
    reader.onload = () => {
        img.src = reader.result as string;
        img.alt = 'Your imgage.';
    };
};

loadRandomMichis(imgs,  API_URL_RANDOM);
loadFavoriteMichis(API_URL_FAVORITES);
