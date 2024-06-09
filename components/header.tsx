// NextJS Core
import Link from 'next/link'

// Styles
import stylesHeader from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={stylesHeader.header}>
            <Link href="/" aria-label='Xaconi.dev' className={stylesHeader.logo}>
                Xaconi.dev
            </Link>
            <nav>
                <Link href="/posts" aria-label="Posts">
                    <span>Posts</span>
                </Link>

                <Link href="/about" aria-label="Sobre mí">
                    <span>Sobre mí</span>
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
                        src="/github-logo.png"
                        width="24"
                        height="24" />
                </a>
            </nav>
        </header>
    )
}