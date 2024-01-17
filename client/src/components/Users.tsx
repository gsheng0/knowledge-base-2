import React from 'react';
import { useQuery } from '@apollo/client';
import { getUsers } from '../graphql/Queries';

const Users: React.FC = () => {
    const { loading, error, data } = useQuery(getUsers());
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error: {error.message}</p>;
    }
    return (
        <div>
          <h2>User List</h2>
          <ul>
            {data.users.map(user => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      );
    };


export default Users;