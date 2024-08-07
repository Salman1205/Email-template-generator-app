import React,{useState} from 'react'

const styles = {
    banner2EmailContainer: {
      height: 'fit-content',
      maxWidth: '400px',
      margin: '40px auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      // overflow: 'hidden', // Uncomment if needed
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
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Uncomment if needed
      borderRadius: '8px 8px 0 0',
    },
    banner2HeroContent: {
      position: 'absolute',
      bottom: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#ffffff',
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
      fontWeight: '600',
    },
    banner2Footer: {
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      padding: '20px',
      textAlign: 'center',
    },
    banner2FooterA: {
      color: '#007bff',
      textDecoration: 'none',
      margin: '0 10px',
    },
  };

const Template2 = ({result}) => {

    const [url, setUrl] = useState(null);

    return (
        <div style={styles.banner2EmailContainer}>
            <div style={styles.banner2Hero}>
                <img style={styles.banner2HeroImage} src={result.image_url} alt="Generated" />
                <div style={styles.banner2HeroOverlay}>
                    <div style={styles.banner2HeroContent}>
                        <h1>{result.subject}</h1>
                    </div>
                </div>
            </div>
            <div style={styles.banner2Main}>
                <h2>{result.promo}</h2>
                <p>{result.description}</p>
                <a href={result.url} style={styles.banner2Button}>Shop Now</a>
            </div>
            <div style={styles.banner2Footer}>
                <a style={styles.banner2FooterA} href="#">Unsubscribe</a>
            </div>
        </div>
    )
}

export default Template2;