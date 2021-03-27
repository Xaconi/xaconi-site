// React
import { useState, useEffect } from 'react';

// Libs
import Markdown from 'markdown-to-jsx';

// Components
import CodeBlock from '../components/code-block';
import DateParser from '../components/date-parser';
import PostImage from './post-image';

// Styles
import postStyles from '../styles/Post.module.css';

// Services
import getBaseURL from '../services/urlService';

export default function Article({title, image, content, link, date}) {

    return(
        <section className={postStyles.post}>
            <article itemScope itemType="http://schema.org/Article">
                {image && <img 
                    alt={title}
                    className={postStyles.img}
                    height="260" 
                    src={ image } 
                    width="640" 
                /> }

                <h1 itemProp="name">{ title }</h1>

                <span itemProp="datePublished" dateTime={date}>
                    <DateParser date={date}></DateParser>
                </span>

                <Markdown
                    itemProp="articleBody"
                    options={{
                        overrides: {
                            pre: {
                                component: CodeBlock,
                            },
                            p: props => {
                                return props.children.some(child => child.type === "img") ? (
                                    <p className={postStyles.imageWrapper}>
                                        <PostImage {...props.children[0].props} />
                                    </p>
                                ) : (
                                  <p {...props} />
                                )
                            },
                        },
                    }}
                >
                    { content }
                </Markdown>
                <div className={postStyles.share}>
                    Comparte!
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${title}&url=${ link }`} 
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