import { gql } from "apollo-server-express";
const Schema = gql`
    type Article {
        _id: String
        title: String!
        content: String!
        authorId: String!
        tags: [String!]!
    }

    type User {
        _id: ID
        username: String!
        password: String!
        email: String!
        articles: [String!]!
      }      
`;

export default Schema