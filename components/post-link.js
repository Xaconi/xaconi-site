// Services
import getBaseURL from '../services/urlService';

export default function PostLink(props) {
    const isExternalLink = props.href.indexOf(getBaseURL('')) == -1;
    return(
        <a 
            target={isExternalLink ? '_blank' : ''}
            href={props.href}
        >
            {props.children[0]}
        </a>
    )
}