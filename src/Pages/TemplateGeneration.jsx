import React, { useState, useRef } from 'react';
import dummy from "../Media/dummy.png";
import Template1 from '../Components/Template1.jsx';
import Template2 from '../Components/Template2.jsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Css/profile.css";

const TemplateGeneration = ({
    menuVisible, 
    setMenuVisible,
    setTemplateForEditor,
    loginCredentials
}) => {

    const navigate = useNavigate();
    const [formFeedback, setFormFeedback] = useState(false);
    const [logoPreview, setLogoPreview] = useState(dummy);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isTemplate1, setIsTemplate1] = useState(true);
    const [selectedLogo, setSelectedLogo] = useState({
        fileType: "",
        base64String: "",
    });
    const [links, setLinks] = useState({
        website: "",
        instagram: "",
        twitter: "",
        facebook: "",
        linkedin: "",
    });

    const promptRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormFeedback(true);
        setTimeout(() => {
            setFormFeedback(false);
        }, 3000);
    };
    
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    
    const handleLogoChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; 
                setLogoPreview(reader.result); 
                setSelectedLogo({
                    fileType: file.type,
                    base64String: base64String
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCopyToClipboard = (id) => {
        const templateElement = document.getElementById(id);
        if (!templateElement) {
            alert("Element not found");
            return;
        }
        
        const range = document.createRange();
        range.selectNode(templateElement);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        try {
            const successful = document.execCommand("copy");
            if (successful) {
                alert("Template copied to clipboard!");
            } else {
                alert("Failed to copy template");
            }
        } catch (err) {
            alert("Failed to copy template");
        }

        window.getSelection().removeAllRanges();
    };

    const extractHtml = (templateId) => {
        const element = document.getElementById(templateId);
        if (element) {
            return element.outerHTML;
        } else {
            console.error(`Element with ID ${templateId} not found.`);
            return null;
        }
    }

    const sendToEditor = (templateId) => {
        const extractedHtml = extractHtml(templateId);
        if (!extractedHtml) return;

        setTemplateForEditor(prev => {
            let current = prev;
            current.body.rows[0].columns[0].contents[0].values.text = extractedHtml;
            return prev;
        });

        navigate("/profile/template-editor");
    };

    const saveToDatabase = async (templateId) => {
        const extractedHtml = extractHtml(templateId);
        if (extractedHtml === null) {
            return;
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_LOGIN_SIGNUP_URL}/template`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: loginCredentials.user_id,
                    template: extractedHtml,
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to save template:', errorText);
                alert('Failed to save template. Please try again.');
                return;
            }
    
            const data = await response.json();
            alert('Successfully added template:', data);
            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };
    
    const toggleTemplate = () => {
        setIsTemplate1(!isTemplate1);
    };

    const updateLink = (linkChange) => {
        setLinks((prev) => ({
            ...prev,
            ...linkChange,
        }));
    }

    const handleSubmitPrompt = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generate-email-template`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: promptRef.current.value,
                    logo: selectedLogo,
                    links: links,
                }),
            });

            const data = await response.json();
            setLoading(false);
            setResult(data.generated_template);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="template-generation">
            <form className="prompt-form" onSubmit={handleSubmitPrompt}>
                <input 
                    type="text"
                    placeholder="Enter prompt"
                    ref={promptRef}
                />
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                />
                <img src={logoPreview} alt="Logo Preview" className="logo-preview" />
                <input
                    type="text"
                    placeholder="Website"
                    value={links.website}
                    onChange={(e) => updateLink({ website: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Instagram"
                    value={links.instagram}
                    onChange={(e) => updateLink({ instagram: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Twitter"
                    value={links.twitter}
                    onChange={(e) => updateLink({ twitter: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Facebook"
                    value={links.facebook}
                    onChange={(e) => updateLink({ facebook: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="LinkedIn"
                    value={links.linkedin}
                    onChange={(e) => updateLink({ linkedin: e.target.value })}
                />
                <button type="submit">Generate Template</button>
            </form>
            
            {loading && <p>Loading...</p>}
            {result && (
                <>
                    <div
                        id={isTemplate1 ? "template1" : "template2"}
                        className="template"
                        dangerouslySetInnerHTML={{ __html: result }}
                    ></div>
                    <button onClick={() => handleCopyToClipboard(isTemplate1 ? "template1" : "template2")}>
                        Copy Template
                    </button>
                    <button onClick={() => saveToDatabase(isTemplate1 ? "template1" : "template2")}>
                        Save Template
                    </button>
                    <button onClick={() => sendToEditor(isTemplate1 ? "template1" : "template2")}>
                        Send to Editor
                    </button>
                </>
            )}
            <button onClick={toggleTemplate}>Toggle Template</button>
        </div>
    );
};

export default TemplateGeneration;
