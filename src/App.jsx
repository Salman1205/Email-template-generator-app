import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import './Css/templateGeneration.css';

const clientId = '359450186285-snvq9iqkcmddvve4i8eb74qokpueud0o.apps.googleusercontent.com';


function App() {
  const navigate=useNavigate();

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signup");
    }
  });

  const [loginCredentials, setLoginCredentials] = useState({
    user_id: 3,
    username: "",
    email: "",
    password: ""
  });

  const [templateForEditor, setTemplateForEditor] = useState({
    "counters": {
        "u_column": 1,
        "u_row": 1
    },
    "body": {
        "id": null,
        "rows": [
            {
                "id": null,
                "cells": [
                    1
                ],
                "columns": [
                    {
                        "id": null,
                        "contents": [
                            {
                                "id": null,
                                "type": "text",
                                "values": {
                                    "text": ""
                                }
                            },
                        ],
                        "values": {
                            "backgroundColor": "",
                            "padding": "0px",
                            "border": {},
                            "borderRadius": "0px",
                            "_meta": {
                                "htmlID": "u_column_1",
                                "htmlClassNames": "u_column"
                            }
                        }
                    }
                ],
                "values": {
                    "displayCondition": null,
                    "columns": true,
                    "backgroundColor": "",
                    "columnsBackgroundColor": "",
                    "backgroundImage": {
                        "url": "",
                        "fullWidth": true,
                        "repeat": "no-repeat",
                        "size": "custom",
                        "position": "center",
                        "customPosition": [
                            "50%",
                            "50%"
                        ]
                    },
                    "padding": "0px",
                    "anchor": "",
                    "hideDesktop": false,
                    "_meta": {
                        "htmlID": "u_row_1",
                        "htmlClassNames": "u_row"
                    },
                    "selectable": true,
                    "draggable": true,
                    "duplicatable": true,
                    "deletable": true,
                    "hideable": true
                }
            }
        ],
        "headers": [],
        "footers": [],
        "values": {
            "popupPosition": "center",
            "popupWidth": "100%",
            "popupHeight": "100%",
            "borderRadius": "0px",
            "contentAlign": "center",
            "contentVerticalAlign": "center",
            "contentWidth": "100%",
            "fontFamily": {
                "label": "Arial",
                "value": "arial,helvetica,sans-serif"
            },
            "textColor": "#000000",
            "popupBackgroundColor": "#FFFFFF",
            "popupBackgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "cover",
                "position": "center"
            },
            "popupOverlay_backgroundColor": "rgba(0, 0, 0, 0.1)",
            "popupCloseButton_position": "top-right",
            "popupCloseButton_backgroundColor": "#DDDDDD",
            "popupCloseButton_iconColor": "#000000",
            "popupCloseButton_borderRadius": "0px",
            "popupCloseButton_margin": "0px",
            "popupCloseButton_action": {
                "name": "close_popup",
                "attrs": {
                    "onClick": "document.querySelector('.u-popup-container').style.display = 'none';"
                }
            },
            "backgroundColor": "#F7F8F9",
            "preheaderText": "",
            "linkStyle": {
                "body": true,
                "linkColor": "#0000ee",
                "linkHoverColor": "#0000ee",
                "linkUnderline": true,
                "linkHoverUnderline": true
            },
            "backgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "custom",
                "position": "center"
            },
            "_meta": {
                "htmlID": "u_body",
                "htmlClassNames": "u_body"
            }
        }
    },
    "schemaVersion": 16
  });


  return (
    // <div className='fullScreen'>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
            <Route 
                path="/signup" 
                element={<Signup 
                    loginCredentials={loginCredentials} 
                    setLoginCredentials={setLoginCredentials}
                />} 
            />
            <Route 
                path="/login" 
                element={<Login 
                    loginCredentials={loginCredentials} 
                    setLoginCredentials={setLoginCredentials} 
                />} 
            />
            <Route 
                path="/profile/*" 
                element={<ProfilePage  
                    loginCredentials={loginCredentials} 
                    setLoginCredentials={setLoginCredentials} 
                    templateForEditor={templateForEditor}
                    setTemplateForEditor={setTemplateForEditor}
                />}
            />
          {/* <Route path="/template-editor" element={<Editor loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} templateForEditor={templateForEditor} setTemplateForEditor={setTemplateForEditor}/>} /> */}
        </Routes>
      </GoogleOAuthProvider>
    // </div>
  );
}

export default App;