import { ApiCat } from "./interfaces";

async function refreshImg (imgElement: HTMLImageElement, url: string): Promise<void> {
    const request = await fetch(url);
    const response: ApiCat[] = await request.json();
    const imgCat = response[0].url;
    imgElement.src = imgCat;
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

const url = 'https://api.thecatapi.com/v1/images/search';
const img = <HTMLImageElement><unknown>document.getElementById('main__img-cat');
const containerImg = <HTMLElement><unknown>document.getElementById('main__figure-img-container-ID');
refreshImg(img, url);

img.addEventListener("load", () => {
    bodyImgConfig(img);
});
