export interface User {
    _id?: any; 
    username: string;
    password: string;
    email: string;
    articles: string[];
}

export interface FetchedUser {
    _id?: any; 
    username: string;
    password: string;
    email: string;
    articles: SubArticle[];
}

export interface SubArticle {
    _id?: any; 
    title: string;
    content?: string;
    tags?: string[];
}