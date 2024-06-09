import Markdown from 'markdown-to-jsx';

import CodeBlock from './code-block';
import DateParser from './date-parser';
import PostImage from './post-image';
import PostLink from './post-link';

import postStyles from '../styles/Post.module.css';

export default function Article(props: { title: string, image: string, content: string, link: string, date: Date }) {

    const image = props.image;
    const title = props.title;
    const content = props.content;
    const link = props.link;
    const date = props.date;

    return (
        <section className={postStyles.post}>
            <article itemScope itemType="http://schema.org/Article">
                {image && <img
                    alt={title}
                    className={postStyles.img}
                    height="260"
                    src={image}
                    width="640"
                />}

                <h1 itemProp="name">{title}</h1>

                <span itemProp="datePublished">
                    <DateParser date={date}></DateParser>
                </span>

                <Markdown
                    itemProp="articleBody"
                    options={{
                        overrides: {
                            pre: {
                                component: CodeBlock,
                            },
                            img: PostImage,
                            a: PostLink
                        },
                    }}
                >
                    {content}
                </Markdown>
                <div className={postStyles.share}>
                    Comparte!
                    <a
                        href={`https://twitter.com/intent/tweet?text=${title}&url=${link}`}
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                    >
                        <img
                            alt="Comparte en Twitter"
                            src="/twitter_logo.svg"
                            width="18"
                            height="18"
                        />
                    </a>
                </div>
            </article>
        </section>
    );
}