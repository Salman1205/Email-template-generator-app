import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Css/templateGeneration.css";
import Template1 from '../Components/Template1.jsx';
import Template2 from '../Components/Template2.jsx';
import InputSection from '../Components/InputSection.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const jsonGenerators = {
  // Arrow function to get button JSON with text and URL
  getButton: (text, url) => ({
      "id": null,
      "type": "button",
      "values": {
          "text": text || "Click Me",
          "href": url || "",
      }
  }),

  // Arrow function to get text JSON with text
  getText: (text) => ({
      "id": null,
      "type": "text",
      "values": {
          "text": text || "This is a default text block.",
      }
  }),

  // Arrow function to get image JSON with URL
  getImage: (url) => ({
      "id": null,
      "type": "image",
      "values": {
          "src": {
              "url": url || ""
          },
          "altText": "Default Image",
      }
  })
};

const TemplateGeneration = ({ setTemplateForEditor }) => {

  const navigate=useNavigate();

  const prompt = useRef(null);
  const [urlForShop, setUrlFromShop] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [result, setResult] = useState({
    description: "the description",
    promo: "PROMOOOO",
    subject: "the main thing",
    image_url: "",
  });

  const setResultToDefault = () => {
    setResult({
      description: "",
      promo: "",
      subject: "",
      image_url: "",
    });
  };

  const handleSendPrompt = () => {
    const Obj = {
      "query": prompt.current.value,
    };
    console.log(Obj);
    fetch(`${process.env.REACT_APP_QUERY_URL}/query`, {
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
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleCopyToClipboard = (templateId) => {
    const templateElement = document.getElementById(templateId);
    const range = document.createRange();
    range.selectNode(templateElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Template copied to clipboard!");
  };

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

  const sendToEditor = (templateId) => {

    const extractedHtml = extractHtml(templateId);
    console.log(extractedHtml);

    setTemplateForEditor(prev => {
      let current = prev;
      current.body.rows[0].columns[0].contents[0].values.text = extractedHtml;
      return prev;
    });

    navigate("/template-editor");
  };

  //working on this
  const seperateOuterDivToEachChild = (html) => {
    // Original container
    const original = document.createElement("div");
    original.innerHTML = html;

    console.log(original.firstElementChild);

    // Select all child nodes of the container
    const children = Array.from(original.childNodes);
    console.log("children: ", children);
    // Create an array to hold the wrapped divs
    const wrappedDivs = [];

    // Iterate through each child node and wrap it in a <div>
    children.forEach(child => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.appendChild(child);
        wrappedDivs.push(wrapperDiv.outerHTML);
    });
    // console.log("Original: ", html);
    // console.log("Seperated: ", wrappedDivs);

    return wrappedDivs;
  }

// Example usage
const originalHtml = `
    <div style="padding: 20px;">
        <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixid=M3w2MzA3MDB8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNzIyMzI3MzcwfDA&amp;ixlib=rb-4.0.3" 
            alt="Generated" 
            style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px 8px 0px 0px;"
        >
        <h2>"Spoil your furry friend with the best!"</h2>
        <p>"Our premium dog food provides complete nutrition for a healthy and vibrant life. Formulated with high-quality ingredients, it supports optimal growth, energy levels, and a shiny coat. Give your dog the gift of delicious, nutritious meals!"</p>
        <a 
            href="#" 
            style="display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: rgb(255, 99, 71); color: rgb(255, 255, 255); text-align: center; text-decoration: none; border-radius: 5px; font-size: 18px;"
        >
            Shop Now
        </a>
    </div>
`;

  const SeperateChildren = (html) => {
    const children = Array.from(html.childNodes);

    children.forEach((child) => {
      const seperateGrandChildren = seperateOuterDivToEachChild(child);
      return seperateGrandChildren;
    })
  }

  return (
    <div className='fullScreen'>
      {/* <button onClick={() => seperateOuterDivToEachChild(originalHtml)}>asdf</button> */}
      <header className='header'>Template Generation</header>
      <div className="mainContainer">

        {/* user input */}
        <InputSection 
          setUrlFromShop={setUrlFromShop} 
          urlForShop={urlForShop} 
          setResultToDefault={setResultToDefault}
          handleSendPrompt={handleSendPrompt}
          prompt={prompt}
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
        />

        {/* output */}
        <div className="outputContainer">
          {
            (result.image_url || uploadedImage) && (
            <>
              <div className="template-container">
                <Dropdown className="template-options">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    •••
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCopyToClipboard('template1')}>
                      Copy to Gmail
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sendToEditor("template1")}>
                      Send to Editor
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div id="template1">
                  <Template1 result={{ ...result, image_url: uploadedImage || result.image_url }} />
                </div>
              </div>
              <div className="template-container">
                <Dropdown className="template-options">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    •••
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCopyToClipboard('template2')}>
                      Copy to Gmail
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => sendToEditor("template2")}>
                      Send to Editor
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div id="template2">
                  <Template2 result={{ ...result, image_url: uploadedImage || result.image_url }} />
                </div>
              </div>
            </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default TemplateGeneration;