import React, { useRef, useState, useEffect } from 'react'
import "../Css/templateGeneration.css"
import "../Css/banner1.css"
import "../Css/banner2.css"
import shoe from "../Media/shoe.jfif"

const TemplateGeneration = () => {

  const prompt = useRef(null);
  const [urlForShop, setUrlFromShop] = useState(null);

  const [result, setResult] = useState({
    description: "",
    promo: "",
    subject: "",
  });

  const [img, setImg] = useState(null);
  const [imageFromCollab, setImageFromCollab] = useState(null);

  const handleImg = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImg(file);
    }
  }

  const handleSendPrompt = () => {
    const Obj = {
      "query": prompt.current.value,
    }
    console.log(Obj);
    fetch("http://127.0.0.1:5000/query", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Obj),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setResult(data);
    })
  }

  const handleGetFromCollab = () => {
    console.log("fetching with prompt: ", prompt.current.value);
    fetch(`https://217b-34-143-143-231.ngrok-free.app/get-image/${prompt.current.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      setImageFromCollab(data.imageBase64);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div className="fullScreen">

      <header className='header'>
        Template Generation
      </header>

      <div className="mainContainer">
        {/* user input */}
        <div className="inputContainer">
          <p>Describe the email you'd like to create</p>
          <textarea 
              name="prompt" 
              id="prompt"
              ref={prompt}
              // style={{width: "391px", height: "154px"}}
              placeholder="Enter your text here..."
              className="promptTextArea">
          </textarea>
          <input 
            type="file" 
            id="inputImage" 
            accept="image/*" 
            onChange={handleImg}  
          />
          <label htmlFor="urlinput">Enter the url:</label>
          <input name = "urlinput"type="text" value={urlForShop} onChange={(event) => {
            setUrlFromShop(event.target.value);
          }}/>
          <button onClick={() => {setImageFromCollab(null);  handleGetFromCollab(); handleSendPrompt();}} >Send to Server</button>
        </div>


        {/* output */}
        <div className="outputContainer">
          {/* <p>Image Prompt:</p>
          {img !== null ? 
            (
            <img 
              src={URL.createObjectURL(img)} 
              alt=""
              className="inputImage"
            />
            ) : (
              "No Image Selected"
            )
          } */}

          {
            imageFromCollab && (
              <>
              <div className="email-container">
            <div className="banner_header">
                <h1>{result.subject}</h1>
            </div>
            <div className="banner_main">
                <img 
                  src={`data:image/png;base64,${imageFromCollab}`}
                  alt="Fetched from Flask server" 
                />
                <h2>{result.promo}</h2>
                <p>{result.description}</p>
                <a href={urlForShop} className="button">Shop Now</a>
            </div>
            <div className="footer">
                <p>Follow us on:</p>
                <a href="your-facebook-link">Facebook</a> |
                <a href="your-twitter-link">Twitter</a> |
                <a href="your-instagram-link">Instagram</a>
                <p>&copy; 2024 BATA. All rights reserved.</p>
            </div>
          </div>
          <div className="banner2-email-container">
            <div className="hero">
                <img 
                  src={`data:image/png;base64,${imageFromCollab}`}
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
                <a href={"nothing" || urlForShop} className="banner2-button">Shop Now</a>
            </div>
            <div className="banner2-footer">
                <p>Connect with us:</p>
                <a href="your-facebook-link">Facebook</a> |
                <a href="your-twitter-link">Twitter</a> |
                <a href="your-instagram-link">Instagram</a>
                <p>&copy; 2024 WadiyaShoes. All rights reserved.</p>
            </div>
        </div>
              </>
            )
          }

          
      </div>


      </div>
    </div>
  )
}

export default TemplateGeneration
