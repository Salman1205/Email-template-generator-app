import React, { useState } from 'react'

const styles = {
    emailContainer: {
      height: 'fit-content',
      width: '400px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    bannerHeader: {
      backgroundColor: '#333333',
      color: '#ffffff',
      padding: '20px',
      textAlign: 'center',
    },
    bannerHeaderH1: {
      margin: '0',
      fontSize: '24px',
    },
    bannerMain: {
      padding: '20px',
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
    },
    footerA: {
      color: '#ff6347',
      textDecoration: 'none',
      margin: '0 10px',
    },
    banner1HeroImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0',
    },
  };

const Template1 = ({ result }) => {

    const [url, setUrl] = useState(null);

  return (
    <div style={styles.emailContainer}>
        <div style={styles.bannerHeader}>
            <h1>{result.subject}</h1>
        </div>
        <div style={styles.bannerMain}>
            <img style={styles.banner1HeroImage} src={result.image_url} alt="Generated" />
            <h2>{result.promo}</h2>
            <p>{result.description}</p>
            <a href={result.url} style={styles.button}>Shop Now</a>
        </div>
        <div style={styles.footer}>
            <a href="#" style={styles.footerA}>Unsubscribe</a>
        </div>
    </div>
  )
}

export default Template1