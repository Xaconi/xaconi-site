// Styles
import styles from '../styles/Footer.module.css';

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <a 
                aria-label="Sígueme en Twitter"
                href="https://twitter.com/xaconi"
                rel="nofollow noopener noreferrer"
            >
                Twitter
            </a>
            
            <a 
                aria-label="GitHub de @Xaconi"
                href="https://github.com/Xaconi"
                rel="nofollow noopener noreferrer"
            >
                GitHub
            </a>
            
            <a 
                aria-label="Contacta conmigo!"
                href="mailto:nicolas.giacconi@gmail.com"
            >
                Contacto
            </a>
            
            <a 
                aria-label="Made with NextJS"
                className={styles.left}
                href="https://nextjs.org/" 
                rel="nofollow noopener noreferrer"
                target="_blank"
            >
                Made with NextJS
            </a>
            
            <a
                aria-label="Powered by Vercel"
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by
                <img 
                    alt="Vercel Logo" 
                    className={styles.logo} 
                    height="16"
                    src="/vercel.svg" 
                    width="71"
                />
            </a>

        </footer>
    );
}