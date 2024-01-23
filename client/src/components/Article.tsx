import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../graphql/Queries';

const Article: React.FC<any> = () => {
    const {articleId} = useParams();
    const { loading, error, data } = useQuery(getArticleById(), 
    {
        variables: {
            id: articleId
        }
    })
    if(loading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    if(!articleId || !data){
        console.log(`Error: ${error}`);
        return (
            <div>
                <h1>Error: Article not found</h1>
            </div>
        )    
    }
    const article = data.getArticleById;
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h1>Article: {articleId}</h1>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <p>
                <strong>Author:</strong> {article.author.username}
            </p>
            <p>
                <strong>Tags:</strong> {article.tags.join(", ")}
            </p>
        </div>
    );
};

export default Article;
