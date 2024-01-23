export interface Article {
    _id?: any; 
    title: string;
    content: string;
    author: string;
    tags: string[];
}

export interface FetchedArticle {
    _id?: any; 
    title: string;
    content: string;
    author: SubUser;
    tags: string[];
}

export interface SubUser {
    _id?: any; 
    username?: string;
    password?: string;
    email?: string;
}