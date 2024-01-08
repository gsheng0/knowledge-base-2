import { ObjectId } from "mongodb";
import { getUserCollection} from "./../configs/mongoCollection.js";
import bcrypt from "bcrypt";
import validator from "validator";
import * as helpers from "./../utils/helpers.js";
import { userNotCreated, userNotFound, objectIdNotValid, allUsersRetrievedFromDatabase, userRetrievedFromDatabase, userSuccessfullyCreated, userNotDeletedFromDatabase, articleNotAddedToUser, articleAddedToUser } from "../utils/errorMessages.js";

export const createUser = async(email, username, password) => {
    const functionSignature = helpers.getFunctionSignature("CreateUser");
    email = validator.trim(email);
    username = validator.trim(username);
    
    if(!validator.isEmail(email)){
        throw `${functionSignature}: '${email}' is not a valid email`;
    } 
    if(!validator.isAlphanumeric(username)){
        throw `${functionSignature}: '${username}' is not a valid username`
    }
    if(!validator.isStrongPassword(password)){
        throw `${functionSignature}: '${password}' is not a valid password`;
    }

    const user = {
        email,
        username,
        password: bcrypt.hash(password, 16),
        articles: []
    };

    const userCollection = await getUserCollection();
    const output = await userCollection.insertOne(user);
    if(!output.acknowledged || !output.insertedId){
        throw userNotCreated(functionSignature, email);
    }
    console.log(userSuccessfullyCreated(functionSignature, email));
    return await getUserById(output.insertedId);
}

export const getUserById = async(id) => {
    const functionSignature = helpers.getFunctionSignature("GetUserById");
    if(!ObjectId.isValid(id)){
        throw objectIdNotValid(functionSignature, id);
    }
    const userCollection = await getUserCollection();
    const user = await userCollection.findOne({_id: id});
    if(!user){
        throw userNotFound(functionSignature, id);
    }
    console.log(userRetrievedFromDatabase(functionSignature, id))
    return cleanUserObject(user);
}

export const getAllUsers = async() => {
    const functionSignature = helpers.getFunctionSignature("GetAllUsers");
    const userCollection = await getUserCollection();
    const users = await userCollection.find({}).toArray();
    console.log(allUsersRetrievedFromDatabase(functionSignature));
    return cleanUserObjects(users);
}

export const deleteUserById = async(id) => {
    const functionSignature = helpers.getFunctionSignature("DeleteUserById");
    if(!ObjectId.isValid(id)){
        throw objectIdNotValid(functionSignature, id);
    }
    const userCollection = await getUserCollection();
    const user = await userCollection.findOne({_id: id});
    if(!user){
        throw userNotFound(functionSignature, id);
    }
    const result = await userCollection.deleteOne(getIdFilter(id));
    if (result.deletedCount !== 1) {
        throw userNotDeletedFromDatabase(functionSignature, id);
    }
    return cleanUserObject(user);
}

export const addArticleToAuthor = async(userId, articleId) => {
    const functionSignature = helpers.getFunctionSignature("RegisterArticleWithUser");
    if(!ObjectId.isValid(id)){
        throw objectIdNotValid(functionSignature, userId);
    }
    if(!ObjectId.isValid(articleId)){
        throw objectIdNotValid(functionSignature, articleId);
    }
    const userCollection = await getUserCollection();
    const updateResult = await userCollection.updateOne(
        { _id: userId},
        { $addToSet: { articles: new ObjectId(articleId) } }
    );
    if(updateResult.modifiedCount !== 1){
        throw articleNotAddedToUser(functionSignature, userId, articleId);
    }
    console.log(articleAddedToUser(functionSignature, userId, articleId));
    return await getUserById(userId);
}

export const removeArticleFromAuthor = async (userId, articleId) => {
    const functionSignature = helpers.getFunctionSignature("UnregisterArticleWithUser");

    if (!ObjectId.isValid(userId)) {
        throw objectIdNotValid(functionSignature, userId);
    }

    if (!ObjectId.isValid(articleId)) {
        throw objectIdNotValid(functionSignature, articleId);
    }

    const userCollection = await getUserCollection();
    //TODO: Check to see if article exists
    

    const updateResult = await userCollection.updateOne(
        { _id: userId },
        { $pull: { articles: new ObjectId(articleId) } }
    );

    if (updateResult.modifiedCount !== 1) {
        throw articleNotRemovedFromAuthor(functionSignature, userId, articleId);
    }

    console.log(articleRemovedFromAuthor(functionSignature, userId, articleId));

    return await getUserById(userId);
};

const cleanUserObject = async (userObject) => {
    delete userObject.password;
    userObject._id = userObject._id.toString();
    return userObject;
};

const cleanUserObjects = async (userObjects) => {
    for(let i = 0; i < userObjects.length; i++){
        userObjects[i] = cleanUserObject(userObjects[i]);
    }
    return userObjects;
}