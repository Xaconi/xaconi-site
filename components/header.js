// NextJS Core
import Link from 'next/link'

// Styles
import stylesHeader from '../styles/Header.module.css';

export default function Header() {
    return(
        <header className={stylesHeader.header}>
            <Link href="/">
                <a 
                    aria-label="Xaconi.dev"
                    className={stylesHeader.logo}
                >
                    Xaconi.dev
                </a>
            </Link>
            <nav>
                <Link href="/posts">
                    <a aria-label="Posts">
                        <span>Posts</span>
                    </a>
                </Link>

                <Link href="/about">
                    <a aria-label="Sobre mí">
                        <span>Sobre mí</span>
                    </a>
                </Link>

                <a 
                    aria-label="Sígueme en Twitter"
                    href="https://twitter.com/xaconi" 
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                >
                    <img 
                        alt="Sígueme en Twitter"
                        src="/twitter_logo.svg" 
                        width="24" 
                        height="24" 
                    />
                </a>

                <a 
                    aria-label="GitHub de @Xaconi"
                    href="https://github.com/Xaconi" 
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                >
                    <img 
                        alt="GitHub de @Xaconi"
                        src="/github_logo.png" 
                        width="24" 
                        height="24" />
                </a>
            </nav>
        </header>
    )
}