// NextJS Core
import Image from 'next/image';

// Styles
import stylesImage from '../styles/Post.module.css';

export default function PostImage(props) {
    return(
        <p className={stylesImage.imageWrapper}>
            <span className={stylesImage.imageOverlay}>
                <img
                    alt={props.alt}
                    height={props.height}
                    src={props.src}
                    width={props.width}
                />
            </span>
            <span className={stylesImage.imageDescription}>{props.alt}</span>
        </p>
    )
}