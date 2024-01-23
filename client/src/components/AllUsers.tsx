import React from 'react';
import { useQuery } from '@apollo/client';
import { getUsers } from '../graphql/Queries';
import { FetchedUser } from "./../model/user";
import UserPreviewCard from './UserPreviewCard';


const AllUsers: React.FC = () => {
    const { loading, error, data } = useQuery(getUsers());

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    let users: FetchedUser[] = []
    for(let i = data.users.length - 1; i >= 0; i--){
        users.push(data.users[i]);
    }

    return (
        <div>
            <h1>All Usersasdfasfasdf</h1>
            {users.map((user, index) => (
            <UserPreviewCard key={index} data={user} />
            ))}
        </div>
    );
};

export default AllUsers;
