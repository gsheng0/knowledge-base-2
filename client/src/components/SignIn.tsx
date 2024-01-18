import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { checkUserWithUsername } from '../graphql/Queries';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, signIn } = useAuth(); // Use useAuth hook

  const [checkUser, { loading, error, data }] = useLazyQuery(checkUserWithUsername());

  const handleSignIn = () => {
    checkUser({
      variables: { username, password },
    });
  };

  if (loading) {
    console.log('Loading');
  }
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  if (data) {
    console.log(data);
    signIn(username, password); // Call signIn when authentication is successful
    return <Navigate to="/" />;
  }
  console.log(isAuthenticated);

  return (
    <div>
      <h1>Sign In Page</h1>

      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <br />

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
