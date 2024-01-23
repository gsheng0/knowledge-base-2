import React from 'react';

const ArticlePreviewCard: React.FC<any> = ({ data }) => {
    if (!data) {
        return <p>Error parsing data. Please check the format.</p>;
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2>{data.title}</h2>
            <p>Author: {data.author.username}</p>
            <p>Tags: {data.tags.join(', ')}</p> 
            <a href={`/article/${data._id}`}>View Article</a>
        </div>
    );
};

export default ArticlePreviewCard;
