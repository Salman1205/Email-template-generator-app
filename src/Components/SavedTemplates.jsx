import React, { useState, useRef, useEffect } from 'react';
import "../Css/profile.css";


const SavedTemplates = ({loginCredentials, setLoginCredentials, menuVisible, setMenuVisible}) => {

    const [templateList, setTemplateList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTemplates = async () => {

        console.log(loginCredentials)

        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_LOGIN_SIGNUP_URL}/templates/${loginCredentials.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
            setLoading(false);
    
            const data = await response.json();
            console.log('Retrieved templates:', data.templates);
            // setTemplateList(data.templates);
            return data.templates;
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            return [];
        }

    };

    useEffect(() => {
        const fetchTemplates = async () => {
            const templates = await getTemplates();
            setTemplateList(templates);
        }
        fetchTemplates();
    }, [])


    const extractHtml = (templateId) => {
        const element = document.getElementById(templateId);
        if (element) {
          const htmlWithInlineStyles = element.innerHTML;
          console.log(htmlWithInlineStyles);
          return htmlWithInlineStyles;
        } else {
          console.error(`Element with ID ${templateId} not found.`);
          return null;
        }
    }

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <div className={`profile_page-main-content ${menuVisible ? 'menu-visible' : ''}`}>
                <button className="profile_page-menu-toggle-outer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <h1>My Templates</h1>
                <div className={`profile_page-additional-content ${menuVisible ? 'menu-visible' : ''}`}>
                    <div className="profile_page-result">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <div className="spinner-grow text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : templateList.length > 0 ? (
                            templateList.map((templateObj, index) => 
                                <div className="template-container">
                                    <div id={`Template-${index}`}>
                                        <p>{`Template-${index}`}</p>
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: templateObj.template }} 
                                        />
                                    </div>
                                </div>
                            )
                            
                            // <div className="template-container">
                            //     <div id="template1">
                            //     </div>
                            // </div>
                        ) : (
                            <p>No result to display</p>
                        )}
                    </div>
                </div>

            </div>
        </>
        // <div style={{justifyContent: "center", justifySelf: "center"}}>
        //     My Templates
        //     {templateList.length > 0 && templateList.map((template) => {
        //         return <div dangerouslySetInnerHTML={{ __html: template }} />
        //     })}
        // </div>
    )
}

export default SavedTemplates