import TemplateGeneration from './Pages/TemplateGeneration';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import Editor from './Components/Editor';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const clientId = '359450186285-snvq9iqkcmddvve4i8eb74qokpueud0o.apps.googleusercontent.com';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to /signup when the path is "/"
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signup");
    }
  }, [location.pathname, navigate]);

  const [loginCredentials, setLoginCredentials] = useState({
    id: 0,
    name: "",
    email: "",
    password: ""
  });

  const [templateForEditor, setTemplateForEditor] = useState(null);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route path="/signup" element={<Signup loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/login" element={<Login loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/profile" element={<ProfilePage loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} />} />
        <Route path="/template-generation" element={<TemplateGeneration loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} setTemplateForEditor={setTemplateForEditor} />} />
        <Route path="/template-editor" element={<Editor loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} templateForEditor={templateForEditor} />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
