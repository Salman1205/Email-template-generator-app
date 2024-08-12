import React from 'react';
import { Helmet } from 'react-helmet';

import edgeIcon from "../Media/edge.png"
import facebookIcon from "../Media/facebook.png"
import instagramIcon from "../Media/instagram.png"
import twitterIcon from "../Media/twitter.png"
import linkedinIcon from "../Media/linkedin.png"

const Template2 = ({ result, logo, links }) => {

  const styles = {
    body: {
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: '#e9ecef',
    },
    logo: {
      width: '80px',
      // position: "absolute",
      marginRight: "320px",
      // marginBottom: "320px",
      // zIndex: 10,
      borderRadius: "10px",
    },
    banner2EmailContainer: {
      height: 'fit-content',
      width: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    banner2Hero: {
      position: 'relative',
      backgroundImage: `url(${result.image_url})`,
      backgroundSize: 'cover', // Optional: Adjusts the size of the background image
      backgroundPosition: 'center', // Optional: Centers the background image
      width: '100%', // Adjust width as needed
      height: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    banner2HeroImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0',
    },
    banner2HeroOverlay: {
      marginTop: "15em",
      width: '100%',
      height: '100%',
      borderRadius: '8px 8px 0 0',
      // alignItems: "center",
      
    },
    banner2HeroContent: {
      textAlign: 'center',
      color: '#ffffff',
      width: '100%',
      alignSelf: "center",
    },
    banner2HeroContentH1: {
      fontSize: '36px',
      marginBottom: '-90%',
      backgroundColor: 'rgba(0, 0, 0, 0.532)',
    },
    banner2HeroContentP: {
      fontSize: '18px',
      marginBottom: '20px',
    },
    banner2Main: {
      padding: '30px',
      width: '400px',
    },
    banner2MainH2: {
      color: '#007bff',
      fontSize: '24px',
      marginBottom: '10px',
    },
    banner2MainP: {
      color: '#555555',
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '20px',
    },
    banner2Button: {
      display: 'block',
      padding: '12px 24px',
      margin: '0 auto',
      backgroundColor: '#007bff',
      color: '#ffffff',
      textAlign: 'center',
      textDecoration: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 600,
    },
    banner2Footer: {
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      padding: '20px',
      textAlign: 'center',
      display: "flex",
      justifyContent: "center",
      gap: "2em",
      width: '400px',
    },
    banner2FooterA: {
      color: 'black',
      textDecoration: 'none',
      margin: '0 10px',
    },
    icon: {
      width: "20px",
      fill: "white",
  
    }
  };

  return (
    <div style={styles.banner2EmailContainer}>
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
      <div style={styles.banner2Hero}>
        {logo !== null && <img src={logo} alt="Logo" style={styles.logo} />}
        <div style={styles.banner2HeroOverlay}>
          <div style={styles.banner2HeroContent}>
            <h1 style={styles.banner2HeroContentH1}>{result.subject}</h1>
          </div>
        </div>
      </div>
      <div style={styles.banner2Main}>
        <h2 style={styles.banner2MainH2}>{result.promo}</h2>
        <p style={styles.banner2MainP}>{result.description}</p>
        <a href={links.website} target="_blank" rel="noopener noreferrer" style={styles.banner2Button}>Shop Now</a>
      </div>
      <div style={styles.banner2Footer}>
        <a href={links.website || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
            <img src={edgeIcon} alt="edge icon" />
            </a>
        <a href={links.instagram || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
            <img src={instagramIcon} alt="instagram icon" />
        </a>
        <a href={links.linkedin || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
            <img src={linkedinIcon} alt="linkedin icon" />
        </a>
        <a href={links.twitter || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
            <img src={twitterIcon} alt="twitter icon" />
        </a>
        <a href={links.facebook || "#"} target="_blank" rel="noopener noreferrer" style={styles.footerA}>
            <img src={facebookIcon} alt="facebook icon" />
        </a>
      </div>
    </div>
  );
};

export default Template2;