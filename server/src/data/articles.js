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
exports.cleanArticleObjects = exports.cleanArticleObject = exports.deleteArticleById = exports.getAllArticlesByAuthorId = exports.getAllArticles = exports.getArticleById = exports.createArticle = void 0;
const validator_1 = __importDefault(require("validator"));
const helpers_1 = require("../utils/helpers");
const errorMessages_1 = require("../utils/errorMessages");
const mongoCollection_1 = require("../configs/mongoCollection");
const mongodb_1 = require("mongodb");
const users_1 = require("./users");
const createArticle = (title, content, tags, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("CreateArticle");
    title = validator_1.default.trim(title);
    content = validator_1.default.trim(content);
    const author = yield (0, users_1.getUserById)(authorId);
    // TODO: Check for duplicate titles
    const article = {
        title,
        content,
        tags,
        authorId
    };
    const articleCollection = yield (0, mongoCollection_1.getArticleCollection)();
    const output = yield articleCollection.insertOne(article);
    if (!output.acknowledged || !output.insertedId) {
        throw (0, errorMessages_1.articleNotCreated)(functionSignature, title);
    }
    console.log((0, errorMessages_1.articleSuccessfullyCreated)(functionSignature, title));
    yield (0, users_1.addArticleToAuthor)(authorId, output.insertedId);
    return yield (0, exports.getArticleById)(output.insertedId);
});
exports.createArticle = createArticle;
const getArticleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("GetArticleById");
    if (!mongodb_1.ObjectId.isValid(id)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, id);
    }
    const articleCollection = yield (0, mongoCollection_1.getArticleCollection)();
    const article = yield articleCollection.findOne({ _id: id });
    if (!article) {
        throw (0, errorMessages_1.articleNotFound)(functionSignature, id);
    }
    console.log((0, errorMessages_1.articleRetrievedFromDatabase)(functionSignature, id));
    return (0, exports.cleanArticleObject)(article);
});
exports.getArticleById = getArticleById;
const getAllArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("GetAllUsers");
    const articleCollection = yield (0, mongoCollection_1.getArticleCollection)();
    const articles = yield articleCollection.find({}).toArray();
    console.log((0, errorMessages_1.allArticlesRetrievedFromDatabase)(functionSignature));
    return (0, exports.cleanArticleObjects)(articles);
});
exports.getAllArticles = getAllArticles;
const getAllArticlesByAuthorId = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("GetAllArticlesByAuthorId");
    const articleCollection = yield (0, mongoCollection_1.getArticleCollection)();
    const articles = yield articleCollection.find({ authorId: authorId }).toArray();
    console.log((0, errorMessages_1.allArticlesByAuthorIdRetrievedFromDatabase)(functionSignature, authorId));
    return (0, exports.cleanArticleObjects)(articles);
});
exports.getAllArticlesByAuthorId = getAllArticlesByAuthorId;
const deleteArticleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const functionSignature = (0, helpers_1.getFunctionSignature)("DeleteUserById");
    if (!mongodb_1.ObjectId.isValid(id)) {
        throw (0, errorMessages_1.objectIdNotValid)(functionSignature, id);
    }
    const articleCollection = yield (0, mongoCollection_1.getArticleCollection)();
    const article = yield articleCollection.findOne({ _id: id });
    if (!article) {
        throw (0, errorMessages_1.articleNotFound)(functionSignature, id);
    }
    const result = yield articleCollection.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
        throw (0, errorMessages_1.articleNotDeletedFromDatabase)(functionSignature, id);
    }
    return (0, exports.cleanArticleObject)(article);
});
exports.deleteArticleById = deleteArticleById;
const cleanArticleObject = (articleObject) => __awaiter(void 0, void 0, void 0, function* () {
    articleObject._id = articleObject._id.toString();
    return articleObject;
});
exports.cleanArticleObject = cleanArticleObject;
const cleanArticleObjects = (articleObjects) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < articleObjects.length; i++) {
        articleObjects[i] = yield (0, exports.cleanArticleObject)(articleObjects[i]);
    }
    return articleObjects;
});
exports.cleanArticleObjects = cleanArticleObjects;
