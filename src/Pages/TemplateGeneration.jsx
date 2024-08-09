import React, { useState, useRef, useEffect } from 'react';
import dummy from "../Media/dummy.png";
import Template1 from '../Components/Template1.jsx';
import Template2 from '../Components/Template2.jsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Css/profile.css";

const TemplateGeneration = ({
    menuVisible, 
    setMenuVisible,
    emplateForEditor, 
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
    })

    
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
    
    // useEffect(() => handleLogoChange(null));

    const createFileFromURL = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            // Create a File object with the Blob
            return new File([blob], "default.png", { type: blob.type });
        } catch (error) {
            console.error('Error creating file from URL:', error);
            return null;
        }
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
        console.log(templateElement);
    
        if (!templateElement) {
            alert("Element not found");
            return;
        }
        
        const range = document.createRange();
        range.selectNode(templateElement);

        // Remove any existing selections
        window.getSelection().removeAllRanges();

        // Add the new range
        window.getSelection().addRange(range);
        
        // Execute the copy command
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

    // Clear the selection
    window.getSelection().removeAllRanges();
    };

    const extractHtml = (templateId) => {
        const element = document.getElementById(templateId);
        if (element) {
        const htmlWithInlineStyles = element.outerHTML;
        return htmlWithInlineStyles;
        } else {
        console.error(`Element with ID ${templateId} not found.`);
        return null;
        }
    }

    const sendToEditor = (templateId) => {

        const extractedHtml = extractHtml(templateId);
        console.log(extractedHtml);
    
        setTemplateForEditor(prev => {
            let current = prev;
            current.body.rows[0].columns[0].contents[0].values.text = extractedHtml;
            return prev;
        });
    
        navigate("/profile/template-editor");
    };

    const handlePromptSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const prompt = promptRef.current.value;
        try {
            const response = await fetch(`${process.env.REACT_APP_QUERY_URL}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: prompt }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const saveToDatabase = async (templateId) => {
        console.log(loginCredentials);
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
        }))
    }

    return (
        <>
            <div className={`profile_page-main-content ${menuVisible ? 'menu-visible' : ''}`}>
                <button className="profile_page-menu-toggle-outer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <h1 style={{ marginLeft: "0.5rem" }}>Template Generation</h1>
                <form id="brand-kit-form" onSubmit={handleSubmit}>
                    <div className="profile_page-form-section">
                        <label htmlFor="logo"><h5>Logo</h5></label>
                        <img src={logoPreview} alt="Logo Preview" id="logo-preview" />
                        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleLogoChange} />
                    </div>
                </form>
                <div className="social-links-section">
                    <h2>Social Links</h2>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input type="text" id="website" placeholder="Enter your website URL" onChange={(e) => updateLink({website: e.target.value})} value={links.website}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input type="text" id="instagram" placeholder="Enter your Instagram URL" onChange={(e) => updateLink({instagram: e.target.value})} value={links.instagram}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="twitter">Twitter</label>
                        <input type="text" id="twitter" placeholder="Enter your Twitter URL" onChange={(e) => updateLink({twitter: e.target.value})} value={links.twitter}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook</label>
                        <input type="text" id="facebook" placeholder="Enter your Facebook URL" onChange={(e) => updateLink({facebook: e.target.value})} value={links.facebook}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input type="text" id="linkedin" placeholder="Enter your LinkedIn URL"onChange={(e) => updateLink({linkedin: e.target.value})} value={links.linkedin}/>
                    </div>
                </div>

            </div>
            <div className={`profile_page-additional-content ${menuVisible ? 'menu-visible' : ''}`}>
                <h1 style={{ textAlign: "center" }}>Template Result</h1>
                <div className="profile_page-result">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="template-container">
                            <div style={{
                                display: "flex",
                                gap: "5em",
                                justifyContent: "center"
                            }}>
                                <button className="copy-button" onClick={() => saveToDatabase(isTemplate1 ? "template1" : "template2")}>
                                    <i class="fa-solid fa-floppy-disk"></i>
                                </button>
                                <button className="copy-button" onClick={() => handleCopyToClipboard(isTemplate1 ? "template1" : "template2")}>
                                    <i className="fa-solid fa-clipboard"></i>
                                </button>
                                <button className="edit-button" onClick={() => sendToEditor(isTemplate1 ? "template1" : "template2")}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className="edit-button" >
                                    <i
                                        className={`fa-solid fa-arrow-right toggle-template ${isTemplate1 ? 'rotate-right' : 'rotate-left'}`}
                                        onClick={toggleTemplate}
                                        aria-label="Toggle Template"
                                    ></i>
                                </button>
                            </div>
                            {isTemplate1 ? 
                            (
                                <div id="template1">
                                    <Template1 
                                        result={result} 
                                        logo={selectedLogo.base64String !== "" ? `data:${selectedLogo.fileType};base64,${selectedLogo.base64String}` : null} 
                                        links={links}
                                    />
                                </div>
                            ) : (
                                <div id="template2">
                                    <Template2 
                                        result={result} 
                                        logo={selectedLogo.base64String !== "" ? `data:${selectedLogo.fileType};base64,${selectedLogo.base64String}` : null} 
                                        links={links}
                                    />
                                </div>
                            )}
                    </div>
                    ) : (
                        <p>No result to display</p>
                    )}
                </div>
            </div>
            <div className={`prompt-section ${menuVisible ? 'slide-right' : ''}`}>
                <form id="prompt-form" onSubmit={handlePromptSubmit} className="profile_page-form-with-icon">
                    <div className="prompt-area">
                        <div className="textarea-container">
                            <textarea id="prompt" ref={promptRef} placeholder="Describe the email you'd like to create" />
                            <button type="submit" className="profile_page-submit-icon" disabled={loading}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div id="form-feedback" className={formFeedback ? '' : 'profile_page-hidden'}>Submitted successfully!</div>
                </form>
            </div>
        </>
    )
}

export default TemplateGeneration;