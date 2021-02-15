// NextJS Core
import Image from 'next/image';

// Libs
import Markdown from 'markdown-to-jsx';

// Styles
import postStyles from '../styles/Post.module.css';

export default function Article({title, image, content}) {
    return(
        <section className={postStyles.post}>
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
                <a href="https://twitter.com/xaconi" target="_blank">
                    <img src="/twitter_logo.svg" width="18" height="18" />
                </a>
            </div>
        </section>
    );
}