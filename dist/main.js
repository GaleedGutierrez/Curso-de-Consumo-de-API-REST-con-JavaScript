import { API, API_URL_FAVORITES, API_URL_FAVORITE_DELETE, API_URL_RANDOM, API_KEY } from "./api.js";
import { errorResponse, httpCodes } from "./errors.js";
import { errorSection, pError, imgs, buttonFavorite2, buttonFavorite1, addFirstKittyParagraph, sectionFavoriteMichis, form, imgHttpCode } from "./htmlElements.js";
export const loadRandomMichis = async (imgs, url) => {
    try {
        const request = await fetch(url);
        if (request.status !== 200) {
            const data = await errorResponse(request);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`);
        }
        const data = await request.json();
        for (let i = 0; i < data.length; i++) {
            imgs[i].src = data[i].url;
        }
        buttonFavorite1.onclick = () => saveFavoriteMichi(API_URL_FAVORITES, data[0].id);
        buttonFavorite2.onclick = () => saveFavoriteMichi(API_URL_FAVORITES, data[1].id);
    }
    catch (error) {
        if (error instanceof Error)
            thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};
const loadFavoriteMichis = async (url) => {
    try {
        const request = await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            }
        });
        if (request.status !== 200) {
            const data = await errorResponse(request);
            throw new Error(`There was an error.
            HTTP Code: ${request.status}.
            Message: ${data.message}.`);
        }
        const data = await request.json();
        if (data.length !== 0)
            addFirstKittyParagraph.classList.add('hidden');
        if (data.length === 0)
            addFirstKittyParagraph.classList.remove('hidden');
        sectionFavoriteMichis.innerHTML = '';
        showFavoritesMichis(data);
    }
    catch (error) {
        if (error instanceof Error)
            thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};
const saveFavoriteMichi = async (url, id) => {
    try {
        const { status, message } = await API_AXIOS.post('/favourites', {
            image_id: id,
        });
        // const request = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'x-api-key': API_KEY,
        //     },
        //     body: JSON.stringify({
        //         image_id: id
        //     }),
        // });
        if (status !== 200) {
            httpCodes(imgHttpCode, status);
            throw new Error(`There was an error.
                HTTP Code: ${status}.
                Message: ${message}.`);
        }
        loadFavoriteMichis(API_URL_FAVORITES);
    }
    catch (error) {
        if (error instanceof Error)
            thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};
const showFavoritesMichis = (data) => {
    const toRender = [];
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
const deleteFavoriteMichi = async (url) => {
    try {
        const request = await fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY,
            }
        });
        if (request.status !== 200) {
            const data = await errorResponse(request);
            throw new Error(`There was an error.
                HTTP Code: ${request.status}.
                Message: ${data.message}.`);
        }
        loadFavoriteMichis(API_URL_FAVORITES);
    }
    catch (error) {
        if (error instanceof Error)
            thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};
const showErrorSection = (errorSection) => {
    if (errorSection.classList.contains('hidden'))
        errorSection.classList.remove('hidden');
};
const thereWasAnErrorMessage = (error) => {
    pError.innerText = error.message;
    console.log(error);
};
export const uploadMichiPhoto = async (url) => {
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
            const data = await errorResponse(request);
            throw new Error(`There was an error.
            HTTP Code: ${request.status}.
            Message: ${data.message}.`);
        }
        const data = await request.json();
        saveFavoriteMichi(API_URL_FAVORITES, data.id);
    }
    catch (error) {
        if (error instanceof Error)
            thereWasAnErrorMessage(error);
        showErrorSection(errorSection);
    }
};
export const showThumbnail = () => {
    const img = document.getElementById('uploadingMichi__img-id');
    const formData = new FormData(form);
    const reader = new FileReader();
    const file = formData.get('file');
    reader.readAsDataURL(file);
    reader.onload = () => {
        img.src = reader.result;
        img.alt = 'Your imgage.';
    };
};
const API_AXIOS = axios.create({
    baseURL: API,
});
API_AXIOS.defaults.headers.common['x-api-key'] = API_KEY;
loadRandomMichis(imgs, API_URL_RANDOM);
loadFavoriteMichis(API_URL_FAVORITES);
