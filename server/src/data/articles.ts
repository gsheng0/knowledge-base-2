import validator from "validator";
import { getFunctionSignature } from "../utils/helpers";
import {
    articleNotCreated,
    articleSuccessfullyCreated,
    articleNotFound,
    articleRetrievedFromDatabase,
    allArticlesRetrievedFromDatabase,
    allArticlesByAuthorIdRetrievedFromDatabase,
    articleNotDeletedFromDatabase,
    objectIdNotValid,
    articleWithTitleAlreadyExists
} from "../utils/errorMessages";
import { getArticleCollection } from "../configs/mongoCollection";
import { ObjectId } from "mongodb";
import { addArticleToAuthor, getUserById } from "./users";
import { Article } from "../model/article";
import { User } from "../model/user";
import { articlesMatchingSearchSuccessfullyRetrieved } from '../utils/errorMessages';

export const createArticle = async (title: string, content: string, tags: string[], authorId: string): Promise<Article> => {
    const functionSignature: string = getFunctionSignature("CreateArticle");
    const articleCollection = await getArticleCollection();
    title = validator.trim(title);
    content = validator.trim(content);

    const author: User = await getUserById(authorId);
    for(let i = 0; i < author.articles.length; i++){
        const articleId: string = author.articles[i];
        const article: Article = await articleCollection.findOne({_id: articleId});
        if(article.title.valueOf() === title.valueOf()){
            throw articleWithTitleAlreadyExists(functionSignature, title);
        }
    }

    const article: Article = {
        title,
        content,
        tags,
        author: authorId
    };
    
    const output = await articleCollection.insertOne(article);
    if (!output.acknowledged || !output.insertedId) {
        throw articleNotCreated(functionSignature, title);
    }
    console.log(articleSuccessfullyCreated(functionSignature, title));
    await addArticleToAuthor(authorId, output.insertedId);
    return cleanArticleObject(await articleCollection.findOne({_id: output.insertedId}));
};

export const getArticleById = async (id: string): Promise<Article> => {
    const functionSignature: string = getFunctionSignature("GetArticleById");
    if (!ObjectId.isValid(id)) {
        throw objectIdNotValid(functionSignature, id);
    }
    const articleCollection = await getArticleCollection();
    const article: Article = await articleCollection.findOne({ _id: new ObjectId(id) });
    if (!article) {
        throw articleNotFound(functionSignature, id);
    }
    console.log(articleRetrievedFromDatabase(functionSignature, id));
    return cleanArticleObject(article);
};

export const getAllArticles = async (): Promise<Article[]> => {
    const functionSignature: string = getFunctionSignature("GetAllArticles");
    const articleCollection = await getArticleCollection();
    const articles: Article[] = await articleCollection.find({}).toArray();
    console.log(allArticlesRetrievedFromDatabase(functionSignature));
    return cleanArticleObjects(articles);
};

export const getAllArticlesByAuthorId = async (authorId: string): Promise<Article[]> => {
    const functionSignature: string = getFunctionSignature("GetAllArticlesByAuthorId");
    const articleCollection = await getArticleCollection();
    const articles: Article[] = await articleCollection.find({ author: authorId }).toArray();
    console.log(allArticlesByAuthorIdRetrievedFromDatabase(functionSignature, authorId));
    return cleanArticleObjects(articles);
};

export const deleteArticleById = async (id: string): Promise<Article> => {
    const functionSignature: string = getFunctionSignature("DeleteUserById");
    if (!ObjectId.isValid(id)) {
        throw objectIdNotValid(functionSignature, id);
    }
    const articleCollection = await getArticleCollection();
    const article: Article = await articleCollection.findOne({ _id: id });
    if (!article) {
        throw articleNotFound(functionSignature, id);
    }
    const result = await articleCollection.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
        throw articleNotDeletedFromDatabase(functionSignature, id);
    }
    return cleanArticleObject(article);
};

export const searchArticle = async(searchTerm: string) => {
    if(!searchTerm){
        return await getAllArticles();
    }
    searchTerm = searchTerm.toLowerCase();
    const functionSignature: string = getFunctionSignature("SearchArticle");
    const articleCollection = await getArticleCollection();
    const articles: Article[] = await articleCollection.find({}).toArray();
    const matchedArticles: Article[] = [];
    for(let i = 0; i < articles.length; i++){
        const article = articles[i];
        if(article.content.toLowerCase().includes(searchTerm)){
            matchedArticles.push(article);
            continue;
        }
        if(article.title.toLowerCase().includes(searchTerm)){
            matchedArticles.push(article);
        }
    }
    console.log(articlesMatchingSearchSuccessfullyRetrieved(functionSignature, searchTerm));
    return matchedArticles;
}

export const cleanArticleObject = (articleObject: Article): Article => {
    articleObject._id = articleObject._id.toString();
    return articleObject;
};

export const cleanArticleObjects = (articleObjects: Article[]): Article[] => {
    for (let i = 0; i < articleObjects.length; i++) {
        articleObjects[i] = cleanArticleObject(articleObjects[i]);
    }
    return articleObjects;
};

