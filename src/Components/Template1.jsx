import React, { useState } from 'react'
import "../Css/banner1.css"

const Template1 = ({ result }) => {

    const [url, setUrl] = useState(null);

  return (
    <div className="email-container">
        <div className="banner_header">
            <h1>{result.subject}</h1>
        </div>
        <div className="banner_main">
            <img 
            src={result.image_url}
            alt="Fetched from Flask server" 
            />
            <h2>{result.promo}</h2>
            <p>{result.description}</p>
            <a href={url} className="button">Shop Now</a>
        </div>
        <div className="footer">
            <p>Follow us on:</p>
            <a href="your-facebook-link">Facebook</a> |
            <a href="your-twitter-link">Twitter</a> |
            <a href="your-instagram-link">Instagram</a>
            <p>&copy; 2024 BATA. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Template1
