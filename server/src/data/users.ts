import validator from "validator";
import bcrypt from "bcrypt";
import { 
    userNotCreated, 
    userSuccessfullyCreated,
    userNotFound,
    userRetrievedFromDatabase,
    allUsersRetrievedFromDatabase,
    userNotDeletedFromDatabase,
    articleNotRemovedFromAuthor,
    articleRemovedFromAuthor,
    articleNotAddedToUser,
    articleAddedToUser,
    objectIdNotValid,
    articleNotFound
} from "../utils/errorMessages";
import { getUserCollection } from "../configs/mongoCollection";
import { ObjectId } from "mongodb";
import { getFunctionSignature } from "../utils/helpers";
import { User } from "../model/user";

export const createUser = async (email: string, username: string, password: string): Promise<User> => {
    const functionSignature: string = getFunctionSignature("CreateUser");
    email = validator.trim(email);
    username = validator.trim(username);

    if (!validator.isEmail(email)) {
        throw `${functionSignature}: '${email}' is not a valid email`;
    }
    if (!validator.isAlphanumeric(username)) {
        throw `${functionSignature}: '${username}' is not a valid username`;
    }
    if (!validator.isStrongPassword(password)) {
        throw `${functionSignature}: '${password}' is not a valid password`;
    }

    const user: User = {
        email,
        username,
        password: bcrypt.hashSync(password, 16),
        articles: []
    };

    const userCollection = await getUserCollection();
    const output = await userCollection.insertOne(user);
    if (!output.acknowledged || !output.insertedId) {
        throw userNotCreated(functionSignature, email);
    }
    console.log(userSuccessfullyCreated(functionSignature, email));
    return cleanUserObject(await userCollection.findOne({ _id: output.insertedId }));
};

export const getUserById = async (id: string): Promise<User> => {
    const functionSignature: string = getFunctionSignature("GetUserById");
    if (!ObjectId.isValid(id)) {
        throw objectIdNotValid(functionSignature, id);
    }
    const userCollection = await getUserCollection();
    const user: User = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
        throw userNotFound(functionSignature, id);
    }
    console.log(userRetrievedFromDatabase(functionSignature, id));
    return cleanUserObject(user);
};

export const getAllUsers = async (): Promise<User[]> => {
    const functionSignature: string = getFunctionSignature("GetAllUsers");
    const userCollection = await getUserCollection();
    const users: User[] = await userCollection.find({}).toArray();
    console.log(allUsersRetrievedFromDatabase(functionSignature));
    return cleanUserObjects(users);
};

export const deleteUserById = async (id: string): Promise<User> => {
    const functionSignature: string = getFunctionSignature("DeleteUserById");
    if (!ObjectId.isValid(id)) {
        throw objectIdNotValid(functionSignature, id);
    }
    const userCollection = await getUserCollection();
    const user: User = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
        throw userNotFound(functionSignature, id);
    }
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount !== 1) {
        throw userNotDeletedFromDatabase(functionSignature, id);
    }
    return cleanUserObject(user);
};

export const addArticleToAuthor = async (userId: string, articleId: string): Promise<User> => {
    const functionSignature: string = getFunctionSignature("AddArticleToAuthor");
    if (!ObjectId.isValid(userId)) {
        throw objectIdNotValid(functionSignature, userId);
    }
    if (!ObjectId.isValid(articleId)) {
        throw objectIdNotValid(functionSignature, articleId);
    }
    const userCollection = await getUserCollection();
    const updateResult = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { articles: new ObjectId(articleId) } }
    );
    if (updateResult.modifiedCount !== 1) {
        throw articleNotAddedToUser(functionSignature, userId, articleId);
    }
    console.log(articleAddedToUser(functionSignature, userId, articleId));
    return await getUserById(userId);
};

export const removeArticleFromAuthor = async (userId: string, articleId: string): Promise<User> => {
    const functionSignature: string = getFunctionSignature("RemoveArticleFromAuthor");
    if (!ObjectId.isValid(userId)) {
        throw objectIdNotValid(functionSignature, userId);
    }
    if (!ObjectId.isValid(articleId)) {
        throw objectIdNotValid(functionSignature, articleId);
    }

    const userCollection = await getUserCollection();
    const user: User = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw userNotFound(functionSignature, userId);
    }

    let found: boolean = false;
    for (let i = 0; i < user.articles.length; i++) {
        if (user.articles[i].valueOf() === articleId.valueOf()) {
            found = true;
        }
    }
    if (!found) {
        throw articleNotFound(functionSignature, articleId);
    }

    const updateResult = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { articles: new ObjectId(articleId) } }
    );

    if (updateResult.modifiedCount !== 1) {
        throw articleNotRemovedFromAuthor(functionSignature, userId, articleId);
    }
    console.log(articleRemovedFromAuthor(functionSignature, userId, articleId));
    return await getUserById(userId);
};

const cleanUserObject = (userObject: User): User => {
    userObject._id = userObject._id.toString();
    return userObject;
};

const cleanUserObjects = (userObjects: User[]): User[] => {
    for (let i = 0; i < userObjects.length; i++) {
        userObjects[i] = cleanUserObject(userObjects[i]);
    }
    return userObjects;
};
