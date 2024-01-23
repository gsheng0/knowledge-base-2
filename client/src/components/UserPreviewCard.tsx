import React from 'react';
import { FetchedUser} from '../model/user';

interface UserPreviewCardProps {
  data: FetchedUser;
}

const UserPreviewCard: React.FC<UserPreviewCardProps> = ({ data }) => {
  if (!data) {
    return <p>Error parsing data. Please check the format.</p>;
  }
  let articleTitles: String[] = [];
  for(let i = 0; i < data.articles.length; i++){
    articleTitles.push(data.articles[i].title);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h2>{data.username}</h2>
      <h3>{data._id}</h3>
      <p>Email: {data.email}</p>
      <p>Articles: {articleTitles.join(", ")}</p>
      <a href={`/user/${data._id}`}>View User</a>
    </div>
  );
};

export default UserPreviewCard;
