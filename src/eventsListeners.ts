import { API_URL_FAVORITES, API_URL_RANDOM } from "./api.js";
import { button, buttonFavorite1, buttonFavorite2, imgs } from "./htmlElements.js";
import { loadRandomMichis, saveFavoriteMichis, loadFavoriteMichis } from "./main.js";

const ctoLoadRandomMichis = () => {
    loadRandomMichis(imgs,  API_URL_RANDOM);
};
button.addEventListener('click', ctoLoadRandomMichis);


const ctoLoadloadFavoriteMichis = () => {
    saveFavoriteMichis(API_URL_FAVORITES);
    loadFavoriteMichis(API_URL_FAVORITES);
};
buttonFavorite1.addEventListener('click', ctoLoadloadFavoriteMichis);
buttonFavorite2.addEventListener('click', ctoLoadloadFavoriteMichis);


