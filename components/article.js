// React
import { useState, useEffect } from 'react';

// Libs
import Markdown from 'markdown-to-jsx';

// Components
import CodeBlock from '../components/code-block';
import DateParser from '../components/date-parser';

// Styles
import postStyles from '../styles/Post.module.css';

// Services
import getBaseURL from '../services/urlService';

export default function Article({title, image, content, link, date}) {

    return(
        <section className={postStyles.post}>
            <article>
                {image && <img 
                    alt={title}
                    className={postStyles.img}
                    height="260" 
                    src={ image } 
                    width="640" 
                /> }
                <h1>{ title }</h1>
                <span>
                    <DateParser date={date}></DateParser>
                </span>
                <Markdown
                    options={{
                        overrides: {
                            pre: {
                                component: CodeBlock,
                            },
                        },
                    }}
                >
                    { content }
                </Markdown>
                <div className={postStyles.share}>
                    Comparte!
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${title}&url=${ getBaseURL(`/${link}`) }`} 
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