import React from 'react';

import { Outlet } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <AuthProvider>
        <div>
            <NavBar/>
            <Outlet />
        </div>
    </AuthProvider>
  );
}

export default App;
