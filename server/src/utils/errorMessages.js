export const userNotFound = (functionSignature, id) => {
    return `${functionSignature}: User with id '${id}' was not found`
}

export const objectIdNotValid = (functionSignature, id) => {
    return `${functionSignature}: '${id}' is not a valid ObjectId`;
}

export const userNotCreated = (functionSignature, email) => {
    return `${functionSignature}: Failed to insert User with email '${email}' into database`;
}

export const userSuccessfullyCreated = (functionSignature, email) => {
    return `${functionSignature}: User with email '${email}' was successfully inserted into database`
}

export const userRetrievedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Retrieved user with id '${id}' from database`;   
}

export const allUsersRetrievedFromDatabase = (functionSignature) => {
    return `${functionSignature}: Retrieved all users from database`;
}

export const userDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Deleted user with id '${id}' from database`;
}

export const userNotDeletedFromDatabase = (functionSignature, id) => {
    return `${functionSignature}: Failed to delete user with id '${id}' from datebase`;
}

export const articleNotAddedToAuthor = (functionSignature, userId, articleId) => {
    return `${functionSignature}: Failed to register article with id '${articleId}' to user with id '${userId}`
}