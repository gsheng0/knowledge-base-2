import { gql } from "@apollo/client";

export const deleteUserById= (): any => {
    return gql`
      mutation deleteUserById{
        deleteUserById($id: String!) {
          _id
          username
          password
          email
          articles {
            title
          }
        }
      }
    `;
  };
  
  export const addArticleToAuthor = (): any => {
    return gql`
      mutation addArticleToAuthor{
        addArticleToAuthor($userId: String!, $articleId: String!) {
          _id
          username
          password
          email
          articles {
            title
          }
        }
      }
    `;
  };
  
  export const removeArticleFromAuthor = (): any => {
    return gql`
      mutation removeArticleFromAuthor{
        removeArticleFromAuthor($userId: String!, $articleId: String!) {
          _id
          username
          password
          email
          articles {
            title
          }
        }
      }
    `;
  };
  
  export const createArticle = (): any => {
    return gql`
      mutation createArticle($title: String!, $content: String!, $tags: [String], $authorId: String!){
        createArticle(title: $title, content: $content, tags: $tags, authorId: $authorId) {
          _id
          title
          content
          author {
            username
          }
          tags
        }
      }
    `;
  };
  
  export const deleteArticleById = (): any => {
    return gql`
      mutation deleteArticleById {
        deleteArticleById($id: String!) {
          _id
          title
          content
          author {
            username
          }
          tags
        }
      }
    `;
  };