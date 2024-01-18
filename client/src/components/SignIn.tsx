import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { checkUserWithUsername } from '../graphql/Queries';
import bcrypt from "bcrypt";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [checkUser, { loading, error, data }] = useLazyQuery(checkUserWithUsername());

  const handleSignIn = () => {
    checkUser({
      variables: { username, password},
    });
  };

  // You can handle loading, error, and data here
  if (loading) {
    console.log("Loading");
  }
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  if (data) {
    console.log(data);
    // You may want to perform further actions based on the data
  }

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
