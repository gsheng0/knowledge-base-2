"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArticleFromAuthor = exports.addArticleToAuthor = exports.deleteUserById = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorMessages_1 = require("../utils/errorMessages");
const mongoCollection_1 = require("../configs/mongoCollection");
const mongodb_1 = require("mongodb");
const helpers_1 = require("../utils/helpers");
const createUser = (email, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("CreateUser");
    email = validator_1.default.trim(email);
    username = validator_1.default.trim(username);
    if (!validator_1.default.isEmail(email)) {
        throw `${functionSignature}: '${email}' is not a valid email`;
    }
    if (!validator_1.default.isAlphanumeric(username)) {
        throw `${functionSignature}: '${username}' is not a valid username`;
    }
    if (!validator_1.default.isStrongPassword(password)) {
        throw `${functionSignature}: '${password}' is not a valid password`;
    }
    const user = {
        email,
        username,
        password: bcrypt_1.default.hashSync(password, 16),
        articles: []
    };
    const userCollection = yield (0, mongoCollection_1.getUserCollection)();
    const output = yield userCollection.insertOne(user);
    if (!output.acknowledged || !output.insertedId) {
        throw (0, errorMessages_1.userNotCreated)(functionSignature, email);
    }
    console.log((0, errorMessages_1.userSuccessfullyCreated)(functionSignature, email));
    return cleanUserObject(yield userCollection.findOne({ _id: output.insertedId }));
});
exports.createUser = createUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("GetUserById");
    if (!mongodb_1.ObjectId.isValid(id)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, id);
    }
    const userCollection = yield (0, mongoCollection_1.getUserCollection)();
    const user = yield userCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    if (!user) {
        throw (0, errorMessages_1.userNotFound)(functionSignature, id);
    }
    console.log((0, errorMessages_1.userRetrievedFromDatabase)(functionSignature, id));
    return cleanUserObject(user);
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("GetAllUsers");
    const userCollection = yield (0, mongoCollection_1.getUserCollection)();
    const users = yield userCollection.find({}).toArray();
    console.log((0, errorMessages_1.allUsersRetrievedFromDatabase)(functionSignature));
    return cleanUserObjects(users);
});
exports.getAllUsers = getAllUsers;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("DeleteUserById");
    if (!mongodb_1.ObjectId.isValid(id)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, id);
    }
    const userCollection = yield (0, mongoCollection_1.getUserCollection)();
    const user = yield userCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
    if (!user) {
        throw (0, errorMessages_1.userNotFound)(functionSignature, id);
    }
    const result = yield userCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    if (result.deletedCount !== 1) {
        throw (0, errorMessages_1.userNotDeletedFromDatabase)(functionSignature, id);
    }
    return cleanUserObject(user);
});
exports.deleteUserById = deleteUserById;
const addArticleToAuthor = (userId, articleId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("AddArticleToAuthor");
    if (!mongodb_1.ObjectId.isValid(userId)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, userId);
    }
    if (!mongodb_1.ObjectId.isValid(articleId)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, articleId);
    }
    const userCollection = yield (0, mongoCollection_1.getUserCollection)();
    const updateResult = yield userCollection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $addToSet: { articles: new mongodb_1.ObjectId(articleId) } });
    if (updateResult.modifiedCount !== 1) {
        throw (0, errorMessages_1.articleNotAddedToUser)(functionSignature, userId, articleId);
    }
    console.log((0, errorMessages_1.articleAddedToUser)(functionSignature, userId, articleId));
    return yield (0, exports.getUserById)(userId);
});
exports.addArticleToAuthor = addArticleToAuthor;
const removeArticleFromAuthor = (userId, articleId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("RemoveArticleFromAuthor");
    if (!mongodb_1.ObjectId.isValid(userId)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, userId);
    }
    if (!mongodb_1.ObjectId.isValid(articleId)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, articleId);
    }
    const userCollection = yield (0, mongoCollection_1.getUserCollection)();
    const user = yield userCollection.findOne({ _id: new mongodb_1.ObjectId(userId) });
    if (!user) {
        throw (0, errorMessages_1.userNotFound)(functionSignature, userId);
    }
    let found = false;
    for (let i = 0; i < user.articles.length; i++) {
        if (user.articles[i].valueOf() === articleId.valueOf()) {
            found = true;
        }
    }
    if (!found) {
        throw (0, errorMessages_1.articleNotFound)(functionSignature, articleId);
    }
    const updateResult = yield userCollection.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $pull: { articles: new mongodb_1.ObjectId(articleId) } });
    if (updateResult.modifiedCount !== 1) {
        throw (0, errorMessages_1.articleNotRemovedFromAuthor)(functionSignature, userId, articleId);
    }
    console.log((0, errorMessages_1.articleRemovedFromAuthor)(functionSignature, userId, articleId));
    return yield (0, exports.getUserById)(userId);
});
exports.removeArticleFromAuthor = removeArticleFromAuthor;
const cleanUserObject = (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    delete userObject.password;
    userObject._id = userObject._id.toString();
    return userObject;
});
const cleanUserObjects = (userObjects) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < userObjects.length; i++) {
        userObjects[i] = cleanUserObject(userObjects[i]);
    }
    return userObjects;
});
