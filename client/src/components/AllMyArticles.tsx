import React from 'react';
import { useQuery } from '@apollo/client';
import { getMyArticlePreviews } from '../graphql/Queries';
import MyArticlePreviewCard from './MyArticlePreviewCard';
import { Article } from '../model/article';
import { useAuth } from '../context/AuthContext';


const AllMyArticles: React.FC = () => {
    const { userInfo } = useAuth();
    const { loading, error, data } = useQuery(getMyArticlePreviews(), {
        variables: {
            authorId: userInfo?._id
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    let articles: Article[] = []
    for(let i = data.articles.length - 1; i >= 0; i--){
        articles.push(data.articles[i]);
    }

    return (
        <div>
            <h1>All Articles</h1>
            {articles.map((article, index) => (
            <MyArticlePreviewCard key={index} data={article} />
            ))}
        </div>
    );
};

export default AllMyArticles;
