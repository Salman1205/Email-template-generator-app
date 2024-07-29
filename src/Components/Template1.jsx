import React, { useState } from 'react'
import template1Css from "../Css/template1.module.css"

const Template1 = ({ result }) => {

    const [url, setUrl] = useState(null);

  return (
    <div className={template1Css['email-container']}>
        <div className={template1Css["banner_header"]}>
            <h1>{result.subject}</h1>
        </div>
        <div className={template1Css.banner_main}>
            <img className={template1Css["banner1-hero-image"]} src={result.image_url} alt="Generated" />
            <h2>{result.promo}</h2>
            <p>{result.description}</p>
            <a href={result.url} className={template1Css.button}>Shop Now</a>
        </div>
        <div className={template1Css.footer}>
            <a href="#">Unsubscribe</a>
        </div>
    </div>
  )
}

export default Template1
