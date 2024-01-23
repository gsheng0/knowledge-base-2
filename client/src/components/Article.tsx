import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
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
    
    if(!articleId || !data){
        console.log(`Error: ${error}`);
        return (
            <div>
                <h1>Error: Article not found</h1>
            </div>
        )    
    }

    console.log(data);
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h1>Article: {articleId}</h1>
        </div>
    );
};

export default Article;
