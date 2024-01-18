import React from 'react';
import { useAuth } from '../context/AuthContext';


const Home: React.FC = () => {
    const { isAuthenticated, signIn } = useAuth(); // Use useAuth hook
    console.log(isAuthenticated);

    if(isAuthenticated){
        return (
            <div>
                <h1>Hi, signed in user</h1>
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