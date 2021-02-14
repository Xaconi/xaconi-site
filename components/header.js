// Styles
import stylesHeader from '../styles/Header.module.css';
import stylesLayouts from '../styles/Layouts.module.css';

export default function Header() {
    return(
        <header className={stylesHeader.header}>
            <a className={stylesHeader.logo}>
                LOGO
            </a>
            <nav>
                <a href="#">Posts</a>
                <a href="#">Sobre mí</a>
            </nav>
        </header>
    )
}