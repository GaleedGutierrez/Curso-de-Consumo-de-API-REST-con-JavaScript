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

const bodyImgConfig = (imgElement: HTMLImageElement): void => {
    let entered = false;
    if (imgElement.height >= 800) {
        containerImg.classList.add('main__figure-img-container--small');
        entered = true;
    }
    const removeClass = imgElement.height <= 800 && containerImg.classList.contains('main__figure-img-container--small') && !entered;
    if (removeClass) containerImg.classList.remove('main__figure-img-container--small');
};

const cto = () => {
    refreshImg(containerImgs,  API_URL);
};

const API_KEY = 'd0bb4eed-2aec-4eaa-8ad7-2639796348e8';
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${API_KEY}`;
const img1 = document.getElementById('main__img-cat-id') as HTMLImageElement;
const img2 = document.getElementById('main__img-cat-id-2') as HTMLImageElement;
const img3 = document.getElementById('main__img-cat-id-3') as HTMLImageElement;
const containerImg = document.getElementById('main__figure-img-container-ID') as HTMLElement;
const button = document.getElementById('button') as HTMLButtonElement;
const containerImgs = [img1, img2, img3];

button.addEventListener('click', cto);

img1.addEventListener("load", () => {
    bodyImgConfig(img1);
});
img2.addEventListener("load", () => {
    bodyImgConfig(img1);
});
img3.addEventListener("load", () => {
    bodyImgConfig(img1);
});

refreshImg(containerImgs,  API_URL);
