// Styles
import stylesPosts from '../styles/Posts.module.css';

// NextJS Core
import Link from 'next/link';

// Components
import DateParser from '../components/date-parser';

export default function ArticleCard({ title, image, description, link, date }) {
    return(
        <Link href={`/${link}`}>
            <a title={title}>
                <article className={stylesPosts.article}>
                    {image ? <img 
                        alt={ title }
                        height="130"
                        src={ image } 
                        width="289"
                    /> : <img 
                        alt={ title }
                        height="130"
                        src={ 'dummy-image.png' } 
                        width="289"
                    />}
                    <div className={stylesPosts.articleInfo}>
                        <h2>{ title }</h2>
                        <span>
                            <DateParser date={date}></DateParser>
                        </span>
                        <p>{ description }</p>
                    </div>
                </article>
            </a>
        </Link>
    )
}