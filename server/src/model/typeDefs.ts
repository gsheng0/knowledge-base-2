import { gql } from "apollo-server-express";
const typeDefs = gql`
    type Article {
        _id: String
        title: String!
        content: String!
        authorId: String!
        tags: [String]
    }

    type User {
        _id: ID
        username: String!
        password: String!
        email: String!
        articles: [String]
    }
    
    type Query {
        users: [User]
        getUserById(id: String!): User
        checkUserWithEmail(email: String!, password: String!): User
        checkUserWithUsername(username: String!, password: String!): User

        articles(authorId: String): [Article]        
        getArticleById(id: String!): Article

    }
      
    type Mutation {
        deleteUserById(id: String!): User
        addArticleToAuthor(userId: String!, articleId: String!): User
        removeArticleFromAuthor(userId: String!, articleId: String!): User

        createArticle(title: String!, content: String!, tags: [String], authorId: String!): Article
        deleteArticleById(id: String!): Article
    }
`;

export default typeDefs