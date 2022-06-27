import { API_URL_IMG_UPLOAD, API_URL_RANDOM } from "./api.js";
import { buttonRefresh, buttonUploadMichi, imgs } from "./htmlElements.js";
import { loadRandomMichis, uploadMichiPhoto } from "./main.js";

buttonRefresh.onclick = () => loadRandomMichis(imgs,  API_URL_RANDOM);
buttonUploadMichi.onclick = () => uploadMichiPhoto(API_URL_IMG_UPLOAD);




