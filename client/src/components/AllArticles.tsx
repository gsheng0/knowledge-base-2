import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { getArticlePreviews } from '../graphql/Queries';
import ArticlePreviewCard from './ArticlePreviewCard';
import { Article } from '../model/article';


const AllArticles: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        console.log(searchTerm);
    },
    [searchTerm])
    const { loading, error, data } = useQuery(getArticlePreviews());

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    let articles: Article[] = []
    for(let i = data.articles.length - 1; i >= 0; i--){
        articles.push(data.articles[i]);
    }

    return (
        <div>
            <h1>All Articles</h1>
            <form>
                <label>
                    Search:
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </label>
            </form>
            {articles.map((article, index) => (
            <ArticlePreviewCard key={index} data={article} />
            ))}
        </div>
    );
};

export default AllArticles;
