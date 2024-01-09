export const userNotFound = (functionSignature, id) => {
    return `${functionSignature}: User with id '${id}' was not found`;
}

export const articleNotFound = (functionSignature, id) => {
    return `${functionSignature}: Article with id '${id}' was not found`;
}

export const objectIdNotValid = (functionSignature, id) => {
    return `${functionSignature}: '${id}' is not a valid ObjectId`;
}

export const userNotCreated = (functionSignature, email) => {
    return `${functionSignature}: Failed to insert user with email '${email}' into database`;
}

export const userSuccessfullyCreated = (functionSignature, email) => {
    return `${functionSignature}: Successfully inserted user with email '${email}' into database`}

export const userRetrievedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Retrieved user with id '${id}' from database`;   
}

export const allUsersRetrievedFromDatabase = (functionSignature) => {
    return `${functionSignature}: Retrieved all users from database`;
}

export const articleRetrievedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Retrieved article with id '${id}' from database`;
}

export const allArticlesRetrievedFromDatabase = (functionSignature) => {
    return `${functionSignature}: Retrieved all articles from database`;
}

export const userDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Successfully deleted user with id '${id}' from database`;
}

export const userNotDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Failed to delete user with id '${id}' from database`;
}

export const articleNotDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Failed to delete article with id '${id}' from database`;
}

export const articleAddedToUser = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Successfully registered article with id '${articleId}' to user with id ${userId}`;
}

export const articleNotAddedToUser = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Failed to register article with id '${articleId}' to user with id '${userId}`;
}

export const articleRemovedFromAuthor = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Successfully removed article with id '${articleId}' from user with id '${userId}'`;
}

export const articleNotRemovedFromAuthor = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Failed to remove article with id '${articleId}' from user with id '${userId}'`;
}

export const articleSuccessfullyCreated = (functionSignature, title) => {
    return `${functionSignature}: Successfully created article with title '${title}'`
}

export const articleNotCreated = (functionSignature, title) => {
    return `${functionSignature}: Failed to create article with title '${title}'`
}

export const allArticlesByAuthorIdRetrievedFromDatabase = (functionSignature, authorId) => {
    return `${functionSignature}: Successfully retrieved all articles by author with id '${authorId}' from database`;
}