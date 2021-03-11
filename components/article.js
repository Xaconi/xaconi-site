// NextJS Core
import Image from 'next/image';

// React
import { useState, useEffect } from 'react';

// Libs
import Markdown from 'markdown-to-jsx';

// Styles
import postStyles from '../styles/Post.module.css';

// Hooks
import useGetDomain from '../hooks/useGetDomain';

export default function Article({title, image, content, link}) {

    const domain = useGetDomain();

    return(
        <section className={postStyles.post}>
            <article>
                <img 
                    alt={title}
                    className={postStyles.img}
                    height="260" 
                    src={ image } 
                    width="640" 
                />
                <h1>{ title }</h1>
                <Markdown>{ content }</Markdown>
                <div className={postStyles.share}>
                    Comparte!
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${title}&url=${domain}/${link}`} 
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