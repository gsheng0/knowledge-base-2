import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../graphql/Queries";

export const User: React.FC = () => {
    const { userId } = useParams();
    const { loading, error, data } = useQuery(getUserById(), {
        variables: {id: userId}
    })
    if(loading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    if(!userId || !data){
        console.log(`Error: ${error}`);
        return (
            <div>
                <h1>Error: User not found</h1>
            </div>
        )
    }
    const user = data.getUserById;

    return (
        <div>
            <h1>User Card</h1>
            <h2>{user.username}</h2>
            <h3>{user._id}</h3>
            <p>Email: {user.email}</p>
        </div>
    )
}