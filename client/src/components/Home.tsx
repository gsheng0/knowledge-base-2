import React from 'react';
import { useAuth } from '../context/AuthContext';


const Home: React.FC = () => {
    const { isAuthenticated, signIn, userInfo } = useAuth(); // Use useAuth hook

    if(isAuthenticated){
        return (
            <div>
                <h1>Hello, TypeScript</h1>
                    <p>This is a basic TypeScript React component.</p>
                <h1>Welcome, {userInfo?.username}</h1>
            </div>
        )
    }

  return (
    <div>
      <h1>Hello, TypeScript</h1>
      <p>This is a basic TypeScript React component.</p>
    </div>
  );
};


export default Home;