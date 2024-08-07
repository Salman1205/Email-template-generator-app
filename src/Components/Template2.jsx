import React from 'react';
import { Helmet } from 'react-helmet';

const styles = {
  body: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#e9ecef',
  },
  logo: {
    width: '80px',
    position: 'fixed',
    marginLeft: "0px",
    zIndex: 10,
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
  },
  banner2HeroImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  },
  banner2HeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '8px 8px 0 0',
  },
  banner2HeroContent: {
    position: 'absolute',
    bottom: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#ffffff',
    width: '100%',
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
  },
  banner2FooterA: {
    color: 'black',
    textDecoration: 'none',
    margin: '0 10px',
  },
};

const Template2 = ({ result, logo }) => {
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
        <img src={logo} alt="Logo" style={styles.logo} />
        <img style={styles.banner2HeroImage} src={result.image_url} alt="Generated" />
        <div style={styles.banner2HeroOverlay}>
          <div style={styles.banner2HeroContent}>
            <h1 style={styles.banner2HeroContentH1}>{result.subject}</h1>
          </div>
        </div>
      </div>
      <div style={styles.banner2Main}>
        <h2 style={styles.banner2MainH2}>{result.promo}</h2>
        <p style={styles.banner2MainP}>{result.description}</p>
        <a href={result.url} style={styles.banner2Button}>Shop Now</a>
      </div>
      <div style={styles.banner2Footer}>
        <a href="#" style={styles.banner2FooterA}><i className="fa-brands fa-edge"></i></a>
        <a href="#" style={styles.banner2FooterA}><i className="fa-brands fa-instagram"></i></a>
        <a href="#" style={styles.banner2FooterA}><i className="fa-brands fa-linkedin"></i></a>
        <a href="#" style={styles.banner2FooterA}><i className="fa-brands fa-twitter"></i></a>
        <a href="#" style={styles.banner2FooterA}><i className="fa-brands fa-facebook"></i></a>
      </div>
    </div>
  );
};

export default Template2;