// NextJS Core
import Link from 'next/link'

// Styles
import stylesHeader from '../styles/Header.module.css';

export default function Header() {
    return(
        <header className={stylesHeader.header}>
            <Link href="/">
                <a className={stylesHeader.logo}>
                    Xaconi.dev
                </a>
            </Link>
            <nav>
                <Link href="/posts">
                    <a>
                        <span>Posts</span>
                    </a>
                </Link>

                <Link href="/about">
                    <a>
                        <span>Sobre mí</span>
                    </a>
                </Link>

                <a href="https://twitter.com/xaconi" target="_blank">
                    <img src="/twitter_logo.svg" width="24" height="24" />
                </a>

                <a href="https://github.com/Xaconi" target="_blank">
                    <img src="/github_logo.png" width="24" height="24" />
                </a>
            </nav>
        </header>
    )
}