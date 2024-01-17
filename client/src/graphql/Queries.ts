import { gql } from '@apollo/client';

// GraphQL query and mutation functions
export const getUsers = (): any => {
  return gql`
    query {
      users {
        _id
        username
        password
        email
        articles
      }
    }
  `;
};

export const getUserById = (): any => {
  return gql`
    query($id: String!) {
      getUserById(id: $id) {
        _id
        username
        password
        email
        articles
      }
    }
  `;
};

export const getArticles = (): any => {
  return gql`
    query($authorId: String) {
      articles(authorId: $authorId) {
        _id
        title
        content
        authorId
        tags
      }
    }
  `;
};

export const getArticleById = (): any => {
  return gql`
    query($id: String!) {
      getArticleById(id: $id) {
        _id
        title
        content
        authorId
        tags
      }
    }
  `;
};
