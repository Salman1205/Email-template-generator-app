import React from 'react'
import "../Css/banner2.css"

const Template2 = ({result}) => {
  return (
    <div className="banner2-email-container">
        <div className="hero">
            <img 
                src={result.image_url}
                alt="Fetched from Flask server"
                className="banner2-hero-image" 
            />
            <div className="banner2-hero-overlay"></div>
            <div className="banner2-hero-content">
                <h1>{result.subject}</h1>
            </div>
        </div>
        <div className="banner2-main">
            <h2>{result.promo}</h2>
            <p>{result.description}</p>
            <a href="" className="banner2-button">Shop Now</a>
        </div>
        <div className="banner2-footer">
            <p>Connect with us:</p>
            <a href="your-facebook-link">Facebook</a> |
            <a href="your-twitter-link">Twitter</a> |
            <a href="your-instagram-link">Instagram</a>
            <p>&copy; 2024 WadiyaShoes. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Template2
