import { ApiCat } from "./interfaces";

const refreshImg = async (
        containerImgs: HTMLImageElement[],
        url: string
    ): Promise<void> => {
    const request = await fetch(url);
    const data: ApiCat[] = await request.json();
    for (let i = 0; i < data.length; i++) {
        containerImgs[i].src = data[i].url;
    }
};

const cto = () => {
    refreshImg(imgs,  API_URL);
};

const API_KEY = 'd0bb4eed-2aec-4eaa-8ad7-2639796348e8';
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=4&api_key=${API_KEY}`;
const img1 = document.getElementById('random-michis__img-cat-1-id') as HTMLImageElement;
const img2 = document.getElementById('random-michis__img-cat-2-id') as HTMLImageElement;
const img3 = document.getElementById('random-michis__img-cat-3-id') as HTMLImageElement;
const img4 = document.getElementById('random-michis__img-cat-4-id') as HTMLImageElement;
const button = document.getElementById('main__button-refresh-id') as HTMLButtonElement;
const imgs = [img1, img2, img3, img4];

button.addEventListener('click', cto);
refreshImg(imgs,  API_URL);
