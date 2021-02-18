// Styles
import stylesPosts from '../styles/Posts.module.css';

// NextJS Core
import Link from 'next/link';

export default function ArticleCard({ title, image, description, link }) {
    return(
        <Link href={`/${link}`}>
            <a title={title}>
                <article className={stylesPosts.article}>
                    <img src={ image } />
                    <div className={stylesPosts.articleInfo}>
                        <h2>{ title }</h2>
                        <p>{ description }</p>
                    </div>
                </article>
            </a>
        </Link>
    )
}