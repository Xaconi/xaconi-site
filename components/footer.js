// Styles
import styles from '../styles/Footer.module.css';

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <a href="https://twitter.com/xaconi">
                Twitter
            </a>
            ·
            <a href="https://github.com/Xaconi">
                GitHub
            </a>
            ·
            <a href="mailto:nicolas.giacconi@gmail.com">
                Contacto
            </a>
            ·
            <a
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by
                <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
            </a>
        </footer>
    );
}