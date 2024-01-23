import { checkUserWithEmail, checkUserWithUsername } from '../data/users';
import { 
    getUserById, 
    deleteUserById, 
    addArticleToAuthor, 
    removeArticleFromAuthor,
    getAllUsers, 
} from '../data/users'; 

import {
    createArticle, 
    deleteArticleById, 
    getArticleById, 
    getAllArticles, 
    getAllArticlesByAuthorId 
} from "../data/articles";
import { Article } from './article';
import { User } from './user';

const resolvers = {
  Query: {
    users: async (_: any) => {
      const users = await getAllUsers();
      return users;
    },
    getUserById: async (_: any, { id }: { id: string }) => {
      return await getUserById(id);
    },
    checkUserWithEmail: async(_: any, { email, password }: {email: string, password: string}) => {
        return await checkUserWithEmail(email, password);
    },
    checkUserWithUsername: async(_: any, { username, password }: {username: string, password: string}) => {
        return await checkUserWithUsername(username, password);
    },
    articles: async (_: any, { authorId }: { authorId: string}) => {
      if (authorId) {
        const articles = await getAllArticlesByAuthorId(authorId);
        return articles;
      } else {
        const articles = await getAllArticles();
        return articles;
      }
    },
    getArticleById: async (_: any, { id }: { id: string}) => {
      return await getArticleById(id);
    }
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
  Article: {
    author: async (parentValue: Article) => await getUserById(parentValue.author)
  },
  User:{//TODO: Rewrite this to not use getAll
    articles: async (parentValue: User) => {
        let articles: Article[] = [];
        for(let i = 0; i < parentValue.articles.length; i++){
            articles.push(await getArticleById(parentValue.articles[i]));
        }
        return articles;
    }
  }
};

export default resolvers;
