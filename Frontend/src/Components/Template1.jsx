import React from 'react';
import { Helmet } from 'react-helmet';

import edgeIcon from "../Media/edge.png"
import facebookIcon from "../Media/facebook.png"
import instagramIcon from "../Media/instagram.png"
import twitterIcon from "../Media/twitter.png"
import linkedinIcon from "../Media/linkedin.png"

const styles = {
    emailContainer: {
        height: 'fit-content',
        width: '400px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative', /* Added for absolute positioning of logo */
    },
    logo: {
        width: "75px", 
        borderRadius: "10px",
    },
    bannerHeader: {
        backgroundColor: '#333333',
        color: '#ffffff',
        padding: '20px',
        textAlign: 'center',
        height: 'fit-content',
        width: "400px",
    },
    bannerHeaderH1: {
        margin: '0',
        fontSize: '24px',
    },
    bannerMain: {
        padding: '20px',
        width: "400px",
    },
    bannerMainImg: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
    },
    bannerMainH2: {
        color: '#333333',
        fontSize: '20px',
    },
    bannerMainP: {
        color: '#666666',
        fontSize: '16px',
    },
    button: {
        display: 'block',
        width: '200px',
        margin: '20px auto',
        padding: '10px',
        backgroundColor: '#ff6347',
        color: '#ffffff',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '18px',
    },
    footer: {
        backgroundColor: '#333333',
        color: 'hsl(0, 0%, 100%)',
        padding: '20px',
        textAlign: 'center',
        width: "400px",
    },
    footerA: {
        color: 'white',
        textDecoration: 'none',
        margin: '0 10px',
    },
    banner1HeroImage: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
        alignSelf: "center",
    },
    icon: {
        width: "20px",
        fill: "white",
    }
};

const Template1 = ({ result, logo, links }) => {

    return (
        <div style={styles.emailContainer}>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Abel&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <div style={styles.bannerHeader}>
                {logo !== null && <img src={logo} alt="Logo" style={styles.logo} />}
                <h1 style={styles.bannerHeaderH1}>{result.subject}</h1>
            </div>
            <div style={styles.bannerMain}>
                <img style={styles.banner1HeroImage} src={result.image_url} alt="Generated" />
                <h2 style={styles.bannerMainH2}>{result.promo}</h2>
                <p style={styles.bannerMainP}>{result.description}</p>
                <a href={links.website} target="_blank" rel="noopener noreferrer" style={styles.button} type="button">Shop Now</a>
            </div>
            <div style={styles.footer}>
                <a href={links.website || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
                    <img src={edgeIcon} alt="edge icon" />
                    {/* <p>asdfsdf</p> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={styles.icon}><path d="M120.1 37.4C161.1 12.2 207.7-.8 255 0C423 0 512 123.8 512 219.5C511.9 252.2 499 283.4 476.1 306.7C453.2 329.9 422.1 343.2 389.4 343.7C314.2 343.7 297.9 320.6 297.9 311.7C297.9 307.9 299.1 305.5 302.7 302.3L303.7 301.1L304.1 299.5C314.6 288 320 273.3 320 257.9C320 179.2 237.8 115.2 136 115.2C98.5 114.9 61.5 124.1 28.5 142.1C55.5 84.6 111.2 44.5 119.8 38.3C120.6 37.7 120.1 37.4 120.1 37.4V37.4zM135.7 355.5C134.3 385.5 140.3 415.5 152.1 442.7C165.7 469.1 184.8 493.7 208.6 512C149.1 500.5 97.1 468.1 59.2 422.7C21.1 376.3 0 318.4 0 257.9C0 206.7 62.4 163.5 136 163.5C172.6 162.9 208.4 174.4 237.8 196.2L234.2 197.4C182.7 215 135.7 288.1 135.7 355.5V355.5zM469.8 400L469.1 400.1C457.3 418.9 443.2 435.2 426.9 449.6C396.1 477.6 358.8 495.1 318.1 499.5C299.5 499.8 281.3 496.3 264.3 488.1C238.7 477.8 217.2 458.1 202.7 435.1C188.3 411.2 181.6 383.4 183.7 355.5C183.1 335.4 189.1 315.2 198.7 297.3C212.6 330.4 236.2 358.6 266.3 378.1C296.4 397.6 331.8 407.6 367.7 406.7C398.7 407 429.8 400 457.9 386.2L459.8 385.3C463.7 383 467.5 381.4 471.4 385.3C475.9 390.2 473.2 394.5 470.2 399.3C470 399.5 469.9 399.8 469.8 400V400z"/></svg> */}
                </a>
                <a href={links.instagram || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
                    <img src={instagramIcon} alt="instagram icon" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={styles.icon}><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg> */}
                </a>
                <a href={links.linkedin || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
                    <img src={linkedinIcon} alt="linkedin icon" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={styles.icon}><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg> */}
                </a>
                <a href={links.twitter || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
                    <img src={twitterIcon} alt="twitter icon" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={styles.icon}><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg> */}
                </a>
                <a href={links.facebook || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
                    <img src={facebookIcon} alt="facebook icon" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={styles.icon}><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg> */}
                </a>
            </div>
        </div>
    );
};

export default Template1;