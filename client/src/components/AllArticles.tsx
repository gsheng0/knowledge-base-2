import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { searchAllArticles } from '../graphql/Queries';
import ArticlePreviewCard from './ArticlePreviewCard';
import { Article } from '../model/article';
import debounce from 'lodash/debounce';

const AllArticles: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchArticle, { loading, error, data }] = useLazyQuery(searchAllArticles());
    const inputRef = useRef<HTMLInputElement | null>(null);

    const debouncedSearch = debounce((term: string) => {
        searchArticle({
            variables: { searchTerm: term }
        });
    }, 300); // Adjust the debounce time as needed

    useEffect(() => {
        console.log(searchTerm);
        debouncedSearch(searchTerm);
        // Set focus on the input field after each search
        inputRef.current?.focus();
    }, [searchTerm, debouncedSearch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>Error retrieving data</p>;

    let articles: Article[] = data.searchArticle.slice().reverse();

    return (
        <div>
            <h1>All Articles</h1>
            <label>
                Search:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    ref={inputRef} // Set a ref to the input element
                />
            </label>
            {articles.map((article, index) => (
                <ArticlePreviewCard key={index} data={article} />
            ))}
        </div>
    );
};

export default AllArticles;
