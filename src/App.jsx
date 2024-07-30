import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import TemplateGeneration from './Pages/TemplateGeneration';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import Editor from './Components/Editor';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = 'your-client-id';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/signup');
    }
  }, [location, navigate]);

  const [loginCredentials, setLoginCredentials] = useState({
    id: 0,
    name: '',
    email: '',
    password: ''
  });

  const [templateForEditor, setTemplateForEditor] = useState({
    body: {
      rows: [
        {
          columns: [
            {
              contents: [
                {
                  type: 'text',
                  values: { text: 'Hello, World!' }
                }
              ]
            }
          ]
        }
      ]
    }
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
          <Route path="/login" element={<Login loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
          <Route path="/profile" element={<ProfilePage loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
          <Route path="/template-generation" element={<TemplateGeneration setTemplateForEditor={setTemplateForEditor} />} />
          <Route path="/template-editor" element={<Editor templateForEditor={templateForEditor} setTemplateForEditor={setTemplateForEditor} />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
