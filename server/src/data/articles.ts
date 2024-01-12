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
    objectIdNotValid
} from "../utils/errorMessages";
import { getArticleCollection } from "../configs/mongoCollection";
import { ObjectId } from "mongodb";
import { addArticleToAuthor, getUserById } from "./users";

export const createArticle = async (title: string, content: string, tags: string[], authorId: string) => {
    const functionSignature = getFunctionSignature("CreateArticle");
    title = validator.trim(title);
    content = validator.trim(content);

    const author = await getUserById(authorId);
    // TODO: Check for duplicate titles
    const article = {
        title,
        content,
        tags,
        authorId
    };
    const articleCollection = await getArticleCollection();
    const output = await articleCollection.insertOne(article);
    if (!output.acknowledged || !output.insertedId) {
        throw articleNotCreated(functionSignature, title);
    }
    console.log(articleSuccessfullyCreated(functionSignature, title));
    await addArticleToAuthor(authorId, output.insertedId);
    return await getArticleById(output.insertedId);
};

export const getArticleById = async (id: string) => {
    const functionSignature = getFunctionSignature("GetArticleById");
    if (!ObjectId.isValid(id)) {
        throw objectIdNotValid(functionSignature, id);
    }
    const articleCollection = await getArticleCollection();
    const article = await articleCollection.findOne({ _id: id });
    if (!article) {
        throw articleNotFound(functionSignature, id);
    }
    console.log(articleRetrievedFromDatabase(functionSignature, id));
    return cleanArticleObject(article);
};

export const getAllArticles = async () => {
    const functionSignature = getFunctionSignature("GetAllUsers");
    const articleCollection = await getArticleCollection();
    const articles = await articleCollection.find({}).toArray();
    console.log(allArticlesRetrievedFromDatabase(functionSignature));
    return cleanArticleObjects(articles);
};

export const getAllArticlesByAuthorId = async (authorId: string) => {
    const functionSignature = getFunctionSignature("GetAllArticlesByAuthorId");
    const articleCollection = await getArticleCollection();
    const articles = await articleCollection.find({ authorId: authorId }).toArray();
    console.log(allArticlesByAuthorIdRetrievedFromDatabase(functionSignature, authorId));
    return cleanArticleObjects(articles);
};

export const deleteArticleById = async (id: string) => {
    const functionSignature = getFunctionSignature("DeleteUserById");
    if (!ObjectId.isValid(id)) {
        throw objectIdNotValid(functionSignature, id);
    }
    const articleCollection = await getArticleCollection();
    const article = await articleCollection.findOne({ _id: id });
    if (!article) {
        throw articleNotFound(functionSignature, id);
    }
    const result = await articleCollection.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
        throw articleNotDeletedFromDatabase(functionSignature, id);
    }
    return cleanArticleObject(article);
};

export const cleanArticleObject = async (articleObject: any) => {
    articleObject._id = articleObject._id.toString();
    return articleObject;
};

export const cleanArticleObjects = async (articleObjects: any[]) => {
    for (let i = 0; i < articleObjects.length; i++) {
        articleObjects[i] = await cleanArticleObject(articleObjects[i]);
    }
    return articleObjects;
};

