// Services
import getBaseURL from '../services/urlService';

// Styles
import stylesLink from '../styles/Post.module.css';

export default function PostLink(props) {
    const isExternalLink = props.href.indexOf(getBaseURL('')) == -1;
    return(
        <a 
            className={isExternalLink ? stylesLink.externalLink : ''}
            href={props.href}
            rel={isExternalLink ? 'noreferrer noopener nofollow' : ''}
            target={isExternalLink ? '_blank' : ''}
            title={props.children[0]}
        >
            {props.children[0]}
        </a>
    )
}