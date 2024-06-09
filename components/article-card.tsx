// Styles
import stylesPosts from '../styles/Posts.module.css';

// NextJS Core
import Link from 'next/link';

// Components
import DateParser from './date-parser';
import { PostSummary } from '@/models/post-summary';

export default function ArticleCard(props: PostSummary) {
    return (
        <Link href={`/${props.link}`}>
            <article className={stylesPosts.article}>
                {props.image ? <img
                    alt={props.title}
                    height="130"
                    src={props.image}
                    width="289"
                /> : <img
                    alt={props.title}
                    height="130"
                    src={'dummy-image.png'}
                    width="289"
                />}
                <div className={stylesPosts.articleInfo}>
                    <h2>{props.title}</h2>
                    {props.date && <span>
                        <DateParser date={props.date}></DateParser>
                    </span>}
                    <p>{props.description}</p>
                </div>
            </article>
        </Link>
    )
}