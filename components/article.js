// NextJS Core
import Image from 'next/image';

// Libs
import Markdown from 'markdown-to-jsx';

export default function Article({title, image, content}) {
    return(
        <section>
            <h1>{ title }</h1>
            <Image src={ image } width="128" height="128" />
            <Markdown>{ content }</Markdown>
        </section>
    );
}