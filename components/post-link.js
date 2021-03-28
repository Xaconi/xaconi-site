// Services
import getBaseURL from '../services/urlService';

// Styles
import stylesLink from '../styles/Post.module.css';

export default function PostLink(props) {
    const isExternalLink = props.href.indexOf(getBaseURL('')) == -1;
    return(
        <a 
            target={isExternalLink ? '_blank' : ''}
            className={isExternalLink ? stylesLink.externalLink : ''}
            href={props.href}
        >
            {props.children[0]}
        </a>
    )
}