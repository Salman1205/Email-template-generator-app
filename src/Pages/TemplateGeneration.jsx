import React, { useRef, useState } from 'react'
import "../Css/templateGeneration.css"
import "../Css/banner2.css"
import Template1 from "../Components/Template1.jsx"
import Template2 from '../Components/Template2.jsx'
import InputSection from '../Components/InputSection.jsx'

const TemplateGeneration = () => {

  const prompt = useRef(null);
  const [urlForShop, setUrlFromShop] = useState(null);

  const [result, setResult] = useState({
    description: "",
    promo: "",
    subject: "",
    image_url: "",
  });

  const setResultToDefault = () => {
    setResult({
      description: "",
      promo: "",
      subject: "",
      image_url: "",
    })
  }

  const handleSendPrompt = () => {
    const Obj = {
      "query": prompt.current.value,
    }
    console.log(Obj);
    fetch("https://ideal-wildly-cat.ngrok-free.app/query", {
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

  return (
    <div className="fullScreen">

      <header className='header'>
        Template Generation
      </header>

      <div className="mainContainer">
        {/* user input */}
        <InputSection 
          setUrlFromShop={setUrlFromShop} 
          urlForShop={urlForShop} 
          setResultToDefault={setResultToDefault}
          handleSendPrompt={handleSendPrompt}
          prompt={prompt}
        />


        {/* output */}
        <div className="outputContainer">
          {
            (result.image_url /*|| !result.image_url*/) && (
            <>
              <Template1 result={result} />
              <Template2 result={result} />
            </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default TemplateGeneration
