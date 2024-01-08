import { ObjectId } from "mongodb";
import { getArticleCollection } from "../configs/mongoCollection";
import validator from "validator";
import * as helpers from "./../utils/helpers.js";
import * as users from "./users.js";
import { articleNotCreated, articleSuccessfullyCreated } from "../utils/errorMessages.js";

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
}