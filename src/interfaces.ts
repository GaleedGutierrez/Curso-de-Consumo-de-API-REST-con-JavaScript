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
