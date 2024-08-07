import React from 'react';
import { Helmet } from 'react-helmet';

const Template1 = ({ result, logo }) => {
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
            width: '80px', /* adjust size as needed */
            marginRight: '20px', /* spacing between logo and heading */
            position: 'absolute', /* Position logo in the top left corner */
            top: '0rem', /* Adjust based on your header padding */
            left: '-0.75rem', /* Adjust based on your header padding */
            zIndex: 10, /* Ensure it is on top of other elements */
        },
        bannerHeader: {
            backgroundColor: '#333333',
            color: '#ffffff',
            padding: '20px',
            textAlign: 'center',
            height: 'fit-content',
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
            color: 'white',
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
                <img src={logo} alt="Logo" style={styles.logo} />
                <h1 style={styles.bannerHeaderH1}>{result.subject}</h1>
            </div>
            <div style={styles.bannerMain}>
                <img style={styles.banner1HeroImage} src={result.image_url} alt="Generated" />
                <h2 style={styles.bannerMainH2}>{result.promo}</h2>
                <p style={styles.bannerMainP}>{result.description}</p>
                <a href={result.url} style={styles.button}>Shop Now</a>
            </div>
            <div style={styles.footer}>
                <a href="#" style={styles.footerA}><i className="fa-brands fa-edge"></i></a>
                <a href="#" style={styles.footerA}><i className="fa-brands fa-instagram"></i></a>
                <a href="#" style={styles.footerA}><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" style={styles.footerA}><i className="fa-brands fa-twitter"></i></a>
                <a href="#" style={styles.footerA}><i className="fa-brands fa-facebook"></i></a>
            </div>
        </div>
    );
};

export default Template1;