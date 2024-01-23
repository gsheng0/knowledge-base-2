import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { getArticlePreviews, searchAllArticles } from '../graphql/Queries';
import ArticlePreviewCard from './ArticlePreviewCard';
import { Article } from '../model/article';


const SearchArticles: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchArticle, {loading, error, data}] = useLazyQuery(searchAllArticles());
    useEffect(() => {
        console.log(searchTerm);
        searchArticle({
            variables: { searchTerm }
        })
    },
    [searchTerm])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if(!data) return <p>Error retrieving data</p>
    console.log(data.searchArticle);
    let articles: Article[] = []
    for(let i = data.searchArticle.length - 1; i >= 0; i--){
        articles.push(data.searchArticle[i]);
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

export default SearchArticles;
