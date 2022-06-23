import { API_URL_RANDOM } from "./api.js";
import { buttonRefresh, imgs } from "./htmlElements.js";
import { loadRandomMichis } from "./main.js";

buttonRefresh.onclick = () => loadRandomMichis(imgs,  API_URL_RANDOM);





