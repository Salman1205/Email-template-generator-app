import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Css/templateGeneration.css";
import Template1 from '../Components/Template1.jsx';
import Template2 from '../Components/Template2.jsx';
import InputSection from '../Components/InputSection.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import juice from 'juice';

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
    fetch(`${process.env.REACT_APP_FLASK_URL}/query`, {
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
      const htmlWithInlineStyles = juice(element.outerHTML);
      return htmlWithInlineStyles;
    } else {
      console.error(`Element with ID ${templateId} not found.`);
      return null;
    }
  }

  const sendToEditor = (templateId) => {

    const extractedHtml = extractHtml(templateId);
    console.log(extractedHtml);

    const design = convertHtmlToUnlayerDesign(extractedHtml);

    setTemplateForEditor(design);
    navigate("/template-editor");
  };

  const convertHtmlToUnlayerDesign = (html) => {
    return {
      "counters": {
          "u_column": 1,
          "u_row": 1
      },
      "body": {
          "id": "NfIZ1jM7Ot",
          "rows": [
              {
                  "id": "BeViTx_Z5m",
                  "cells": [
                      1
                  ],
                  "columns": [
                      {
                          "id": "ObTG2DpJDl",
                          "contents": [
                              {
                                  "id": "text_block_1",
                                  "type": "html",
                                  "values": {
                                      "html": html
                                  }
                              }
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
                      "columns": false,
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
              "popupWidth": "600px",
              "popupHeight": "auto",
              "borderRadius": "10px",
              "contentAlign": "center",
              "contentVerticalAlign": "center",
              "contentWidth": "500px",
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
    };
  };

  return (
    <div className="fullScreen">
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