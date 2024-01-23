import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { createArticle } from '../graphql/Mutations';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const WriteArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState("");

  const { isAuthenticated, signIn, userInfo} = useAuth(); // Use useAuth hook

  const [createArticleCall, { loading, error, data }] = useMutation(createArticle());

  const handleCreateArticle = () => {
    createArticleCall({
      variables: { title: title, content: content, tags: tags.split(","), authorId: userInfo?._id},
    });
  };

  if (loading) {
    console.log('Loading');
  }
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  if (data) {
    console.log(JSON.stringify(data));
    return <Navigate to="/" />;
  }


  return (
    <div>
      <h1>Write Article</h1>

      <form>
        <label>
          Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <br />

        <label>
          Content
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>

        <label>
          Tags
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>

        <br />

        <button type="button" onClick={handleCreateArticle}>
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default WriteArticle;
