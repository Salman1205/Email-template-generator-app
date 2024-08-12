import React, { useState, useRef } from 'react';
import dummy from "../Media/dummy.png";
import Template1 from '../Components/Template1.jsx';
import { useNavigate } from 'react-router-dom';

const TemplateGeneration = ({menuVisible, setMenuVisible}) => {

    const navigate = useNavigate();

    const [formFeedback, setFormFeedback] = useState(false);
    const [logoPreview, setLogoPreview] = useState(dummy);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
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

    const handleLogoChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setLogoPreview(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleCopyToClipboard = (id) => {
        const element = document.getElementById(id);
        navigator.clipboard.writeText(element.innerText);
        alert("Copied to clipboard");
    };

    const sendToEditor = (id) => {
        const element = document.getElementById(id);
        navigate("/editor", { state: { content: element.innerHTML } });
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

    return (
        <div>
        {/* have to send to seperatae componnet */}
            <div className={`profile_page-main-content ${menuVisible ? 'menu-visible' : ''}`}>
                <button className="profile_page-menu-toggle-outer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <h1>Template Generation</h1>
                <form id="brand-kit-form" onSubmit={handleSubmit}>
                    <div className="profile_page-form-section">
                        <label htmlFor="logo"><h5>Logo</h5></label>
                        <img src={logoPreview} alt="Logo Preview" id="logo-preview" />
                        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleLogoChange} />
                    </div>
                </form>
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
                            <button className="copy-button" onClick={() => handleCopyToClipboard('template1')}>
                                Copy to Clipboard
                            </button>
                            <button className="edit-button" onClick={() => sendToEditor("template1")}>
                                Edit Template
                            </button>
                            <div id="template1">
                                <Template1 result={result} />
                            </div>
                        </div>
                    ) : (
                        <p>No result to display</p>
                    )}
                </div>
            </div>
            <div className={`prompt-section ${menuVisible ? 'slide-right' : ''}`}>
                <form id="prompt-form" onSubmit={handlePromptSubmit} className="profile_page-form-with-icon">
                    <div className="profile_page-form-section">
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
        </div>
    )
}

export default TemplateGeneration;