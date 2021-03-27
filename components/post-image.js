// NextJS Core
import Image from 'next/image';

// Styles
import stylesImage from '../styles/Post.module.css';

export default function PostImage(props) {
    return(
        <>
            <img
                src={props.src}
                alt={props.alt}
                width={650}
                height={350}
            />
            <span className={stylesImage.imageDescription}>{props.alt}</span>
        </>
    )
}