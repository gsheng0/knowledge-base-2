import { 
    getUserById, 
    deleteUserById, 
    addArticleToAuthor, 
    removeArticleFromAuthor,
    getAllUsers, 
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
    users: async (_: any) => {
      return await getAllUsers();
    },
    getUserById: async (_: any, { id }: { id: string }) => {
      return await getUserById(id);
    },
    articles: async (_: any, { authorId }: { authorId: string}) => {
      if (authorId) {
        return await getAllArticlesByAuthorId(authorId);
      } else {
        return await getAllArticles();
      }
    },
    getArticleById: async (_: any, { id }: { id: string}) => {
      return await getArticleById(id);
    },
  },
  Mutation: {
    deleteUserById: async (_: any, { id }: { id: string }) => {
      return await deleteUserById(id);
    },
    addArticleToAuthor: async (_: any, { userId, articleId }: { userId: string, articleId: string}) => {
      return await addArticleToAuthor(userId, articleId);
    },
    removeArticleFromAuthor: async (_: any, { userId, articleId }: { userId: string, articleId: string}) => {
      return await removeArticleFromAuthor(userId, articleId);
    },
    createArticle: async (_: any, { title, content, tags, authorId }: { title: string, content: string, tags: [string], authorId: string}) => {
      return await createArticle(title, content, tags, authorId);
    },
    deleteArticleById: async (_: any, { id }: { id: string }) => {
      return await deleteArticleById(id);
    },
  },
};

export default resolvers;
