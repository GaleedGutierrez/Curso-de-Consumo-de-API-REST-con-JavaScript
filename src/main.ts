import { ApiCat } from "./interfaces";

async function refreshImg (
    containerImgs: HTMLImageElement[],
    url: string
    ): Promise<void> {
    const request = await fetch(url);
    const data: ApiCat[] = await request.json();
    console.log('data: ', data);
    for (let i = 0; i < data.length; i++) {
        containerImgs[i].src = data[i].url;
    }
}

function bodyImgConfig (imgElement: HTMLImageElement): void {
    let entered = false;
    if (imgElement.height >= 800) {
        containerImg.classList.add('main__figure-img-container--small');
        entered = true;
    }
    const removeClass = imgElement.height <= 800 && containerImg.classList.contains('main__figure-img-container--small') && !entered;
    if (removeClass) containerImg.classList.remove('main__figure-img-container--small');
}

const cto = () => {
    refreshImg(containerImgs, url);
};

const url = 'https://api.thecatapi.com/v1/images/search?limit=3';
const img1 = <HTMLImageElement><unknown>document.getElementById('main__img-cat-id');
const img2 = <HTMLImageElement><unknown>document.getElementById('main__img-cat-id-2');
const img3 = <HTMLImageElement><unknown>document.getElementById('main__img-cat-id-3');
const containerImg = <HTMLElement><unknown>document.getElementById('main__figure-img-container-ID');
const button = <HTMLElement><unknown>document.getElementById('button');
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

refreshImg(containerImgs, url);
