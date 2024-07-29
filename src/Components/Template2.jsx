import React,{useState} from 'react'
import template2Css from "../Css/template2.module.css"

const Template2 = ({result}) => {

    const [url, setUrl] = useState(null);

    return (
        <div className={template2Css["banner2-email-container"]}>
            <div className={template2Css["banner2-hero"]}>
                <img className={template2Css["banner2-hero-image"]} src={result.image_url} alt="Generated" />
                <div className={template2Css["banner2-hero-overlay"]}>
                    <div className={template2Css["banner2-hero-content"]}>
                        <h1>{result.subject}</h1>
                    </div>
                </div>
            </div>
            <div className={template2Css["banner2-main"]}>
                <h2>{result.promo}</h2>
                <p>{result.description}</p>
                <a href={result.url} className={template2Css["banner2-button"]}>Shop Now</a>
            </div>
            <div className={template2Css["banner2-footer"]}>
                <a href="#">Unsubscribe</a>
            </div>
        </div>
    )
}

export default Template2
