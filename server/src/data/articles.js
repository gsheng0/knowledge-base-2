import { ObjectId } from "mongodb";
import { getArticleCollection } from "../configs/mongoCollection";
import validator from "validator";
import * as helpers from "./../utils/helpers.js";
import * as users from "./users.js";
import { allArticlesRetrievedFromDatabase, articleNotCreated, articleNotDeletedFromDatabase, articleNotFound, articleRetrievedFromDatabase, articleSuccessfullyCreated, objectIdNotValid } from "../utils/errorMessages.js";

export const createArticle = async(title, content, tags, authorId) => {
    const functionSignature = helpers.getFunctionSignature("CreateArticle");
    title = validator.trim(title);
    content = validator.trim(content);
    
    const author = await users.getUserById(authorId);
    //TODO: Check for duplicate titles
    const article = {
        title,
        content,
        tags,
        authorId
    };
    const articleCollection = await getArticleCollection();
    const output = await articleCollection.insertOne(article);
    if(!output.acknowledged || !output.insertedId){
        throw articleNotCreated(functionSignature, title);
    }
    console.log(articleSuccessfullyCreated(functionSignature, title));
    await users.addArticleToAuthor(authorId, output.insertedId);
    return await getArticleById(output.insertedId);
}

export const getArticleById = async(id) => {
    const functionSignature = helpers.getFunctionSignature("GetArticleById");
    if(!ObjectId.isValid(id)){
        throw objectIdNotValid(functionSignature, id);
    }
    const articleCollection = await getArticleCollection();
    const article = await articleCollection.findOne({_id: id});
    if(!article){
        throw articleNotFound(functionSignature, id);
    }
    console.log(articleRetrievedFromDatabase(functionSignature, id));
    return cleanArticleObject(article);
}

export const getAllArticles = async() => {
    const functionSignature = helpers.getFunctionSignature("GetAllUsers");
    const articleCollection = await getArticleCollection();
    const articles = await articleCollection.find({}).toArray();
    console.log(allArticlesRetrievedFromDatabase(functionSignature));
    return cleanArticleObjects(articles);
}

export const deleteArticleById = async(id) => {
    const functionSignature = helpers.getFunctionSignature("DeleteUserById");
    if(!ObjectId.isValid(id)){
        throw objectIdNotValid(functionSignature, id);
    }
    const articleCollection = await getArticleCollection();
    const article = await articleCollection.findOne({_id: id});
    if(!article){
        throw articleNotFound(functionSignature, id);
    }
    const result = await articleCollection.deleteOne({_id: id});
    if(result.deletedCount !== 1){
        throw articleNotDeletedFromDatabase(functionSignature, id);
    }
    return cleanArticleObject(article);
}

const cleanArticleObject = async(articleObject) => {
    articleObject._id = articleObject._id.toString();
    return articleObject;
}

const cleanArticleObjects = async(articleObjects) => {
    for(let i = 0; i < articleObjects.length; i++){
        articleObjects[i] = cleanArticleObject(articleObjects[i]);
    }
    return articleObjects[i];
}