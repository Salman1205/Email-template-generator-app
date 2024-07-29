import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import TemplateGeneration from './Pages/TemplateGeneration';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import Editor from './Components/Editor';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = 'your-client-id';

function App() {
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signup");
    }
  }, [location, navigate]);

  const [loginCredentials, setLoginCredentials] = useState({
    id: 0,
    name: "",
    email: "",
    password: ""
  });

  // Define or fetch the template data
  const [templateForEditor, setTemplateForEditor] = useState({
    // Sample design data structure
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
      <Routes>
        <Route path="/signup" element={<Signup loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/login" element={<Login loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/profile" element={<ProfilePage loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/template-generation" element={<TemplateGeneration loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/template-editor" element={<Editor loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} templateForEditor={templateForEditor} />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
