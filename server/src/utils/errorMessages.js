"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allArticlesByAuthorIdRetrievedFromDatabase = exports.articleNotCreated = exports.articleSuccessfullyCreated = exports.articleNotRemovedFromAuthor = exports.articleRemovedFromAuthor = exports.articleNotAddedToUser = exports.articleAddedToUser = exports.articleNotDeletedFromDatabase = exports.userNotDeletedFromDatabase = exports.userDeletedFromDatabase = exports.allArticlesRetrievedFromDatabase = exports.articleRetrievedFromDatabase = exports.allUsersRetrievedFromDatabase = exports.userRetrievedFromDatabase = exports.userSuccessfullyCreated = exports.userNotCreated = exports.objectIdNotValid = exports.articleNotFound = exports.userNotFound = void 0;
const userNotFound = (functionSignature, id) => {
    return `${functionSignature}: User with id '${id}' was not found`;
};
exports.userNotFound = userNotFound;
const articleNotFound = (functionSignature, id) => {
    return `${functionSignature}: Article with id '${id}' was not found`;
};
exports.articleNotFound = articleNotFound;
const objectIdNotValid = (functionSignature, id) => {
    return `${functionSignature}: '${id}' is not a valid ObjectId`;
};
exports.objectIdNotValid = objectIdNotValid;
const userNotCreated = (functionSignature, email) => {
    return `${functionSignature}: Failed to insert user with email '${email}' into database`;
};
exports.userNotCreated = userNotCreated;
const userSuccessfullyCreated = (functionSignature, email) => {
    return `${functionSignature}: Successfully inserted user with email '${email}' into database`;
};
exports.userSuccessfullyCreated = userSuccessfullyCreated;
const userRetrievedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Retrieved user with id '${id}' from database`;
};
exports.userRetrievedFromDatabase = userRetrievedFromDatabase;
const allUsersRetrievedFromDatabase = (functionSignature) => {
    return `${functionSignature}: Retrieved all users from database`;
};
exports.allUsersRetrievedFromDatabase = allUsersRetrievedFromDatabase;
const articleRetrievedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Retrieved article with id '${id}' from database`;
};
exports.articleRetrievedFromDatabase = articleRetrievedFromDatabase;
const allArticlesRetrievedFromDatabase = (functionSignature) => {
    return `${functionSignature}: Retrieved all articles from database`;
};
exports.allArticlesRetrievedFromDatabase = allArticlesRetrievedFromDatabase;
const userDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Successfully deleted user with id '${id}' from database`;
};
exports.userDeletedFromDatabase = userDeletedFromDatabase;
const userNotDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Failed to delete user with id '${id}' from database`;
};
exports.userNotDeletedFromDatabase = userNotDeletedFromDatabase;
const articleNotDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Failed to delete article with id '${id}' from database`;
};
exports.articleNotDeletedFromDatabase = articleNotDeletedFromDatabase;
const articleAddedToUser = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Successfully registered article with id '${articleId}' to user with id ${userId}`;
};
exports.articleAddedToUser = articleAddedToUser;
const articleNotAddedToUser = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Failed to register article with id '${articleId}' to user with id '${userId}'`;
};
exports.articleNotAddedToUser = articleNotAddedToUser;
const articleRemovedFromAuthor = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Successfully removed article with id '${articleId}' from user with id '${userId}'`;
};
exports.articleRemovedFromAuthor = articleRemovedFromAuthor;
const articleNotRemovedFromAuthor = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Failed to remove article with id '${articleId}' from user with id '${userId}'`;
};
exports.articleNotRemovedFromAuthor = articleNotRemovedFromAuthor;
const articleSuccessfullyCreated = (functionSignature, title) => {
    return `${functionSignature}: Successfully created article with title '${title}'`;
};
exports.articleSuccessfullyCreated = articleSuccessfullyCreated;
const articleNotCreated = (functionSignature, title) => {
    return `${functionSignature}: Failed to create article with title '${title}'`;
};
exports.articleNotCreated = articleNotCreated;
const allArticlesByAuthorIdRetrievedFromDatabase = (functionSignature, authorId) => {
    return `${functionSignature}: Successfully retrieved all articles by author with id '${authorId}' from database`;
};
exports.allArticlesByAuthorIdRetrievedFromDatabase = allArticlesByAuthorIdRetrievedFromDatabase;
