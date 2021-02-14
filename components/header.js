// NextJS Core
import Image from 'next/image';

// Styles
import stylesHeader from '../styles/Header.module.css';

export default function Header() {
    return(
        <header className={stylesHeader.header}>
            <a className={stylesHeader.logo}>
                LOGO
            </a>
            <nav>
                <a href="#">
                    <span>Posts</span>
                </a>

                <a href="#">
                    <span>Sobre mí</span>
                </a>

                <a href="https://twitter.com/xaconi">
                    <img src="/twitter_logo.svg" width="24" height="24" />
                </a>

                <a href="https://github.com/Xaconi">
                    <img src="/github_logo.png" width="24" height="24" />
                </a>
            </nav>
        </header>
    )
}