export interface ApiCat {
    breeds: unknown[];
    id:     string;
    url:    string;
    width:  number;
    height: number;
}

export interface ApiCatError {
    headers: Headers;
    level:   string;
    message: string;
    status:  number;
}

export interface ApiFavoriteCat {
    created_at: Date;
    id:         number;
    image:      ImageFavoriteCat;
    image_id:   string;
    sub_id:     null;
    user_id:    string;
}

export interface ImageFavoriteCat {
    id:  string;
    url: string;
}
