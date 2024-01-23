import React from 'react';
import { useQuery } from '@apollo/client';
import { getArticles } from '../graphql/Queries';
import ArticlePreviewCard from './ArticlePreviewCard';
import { Article } from '../model/article';


const AllArticles: React.FC = () => {
    const { loading, error, data } = useQuery(getArticles());

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
            <ArticlePreviewCard key={index} data={article} />
            ))}
        </div>
    );
};

export default AllArticles;
