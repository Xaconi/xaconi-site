// NextJS Core
import Image from 'next/image';

// Libs
import Markdown from 'markdown-to-jsx';

// Styles
import postStyles from '../styles/Post.module.css';

export default function Article({title, image, content}) {
    return(
        <section className={postStyles.post}>
            <Image 
                height="320" 
                layout="responsive" 
                src={ image } 
                width="720" 
            />
            <h1>{ title }</h1>
            <Markdown>{ content }</Markdown>
        </section>
    );
}