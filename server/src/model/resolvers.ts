import { 
    getUserById, 
    deleteUserById, 
    addArticleToAuthor, 
    removeArticleFromAuthor, 
} from '../data/users';  // Import your database methods

import {
    createArticle, 
    deleteArticleById, 
    getArticleById, 
    getAllArticles, 
    getAllArticlesByAuthorId 
} from "../data/articles";

const resolvers = {
  Query: {
    users: async () => {
      // Implement logic to retrieve all users
    },
    getUserById: async (_: any, { id }: { id: string }) => {
      return getUserById(id);
    },
    articles: async (_: any, { authorId }: { authorId: string}) => {
      if (authorId) {
        return getAllArticlesByAuthorId(authorId);
      } else {
        return getAllArticles();
      }
    },
    getArticleById: async (_: any, { id }: { id: string}) => {
      return getArticleById(id);
    },
  },
  Mutation: {
    deleteUserById: async (_: any, { id }: { id: string }) => {
      return deleteUserById(id);
    },
    addArticleToAuthor: async (_: any, { userId, articleId }: { userId: string, articleId: string}) => {
      return addArticleToAuthor(userId, articleId);
    },
    removeArticleFromAuthor: async (_: any, { userId, articleId }: { userId: string, articleId: string}) => {
      return removeArticleFromAuthor(userId, articleId);
    },
    createArticle: async (_: any, { title, content, tags, authorId }: { title: string, content: string, tags: [string], authorId: string}) => {
      return createArticle(title, content, tags, authorId);
    },
    deleteArticleById: async (_: any, { id }: { id: string }) => {
      return deleteArticleById(id);
    },
  },
};

export default resolvers;
