// React
import { useEffect, useState } from 'react';

// Libs 
import Prism from 'prismjs';

export default function CodeBlock({ children }) {
    const language = children.props.className.replace('lang-', '');
    const code = `// Made with ♥ by @Xaconi - Happy coding! \n${children.props.children}`;

    const [ showSvg, setShowSvg ] = useState('showSvg');
    const [ buttonText, setButtonText ] = useState('');
    useEffect(() => {
        Prism.highlightAll();
    });

    function copyCode() {
        var data = [new ClipboardItem({ 
            "text/plain": new Blob(
                [code], 
                { type: "text/plain" }
            ) 
        })];
        navigator.clipboard.write(data);

        setShowSvg('displayNone');
        setButtonText('//Copiado!');

        setTimeout(function() {
            setShowSvg('showSvg');
            setButtonText('');
        }, 2000);
    }

    return(
        <code-block>
            <pre className={`  language-${language}`}>
                <code className={`  language-${language}`} data-lang={language}>
                    { children.props.children }
                </code>
            </pre>
            <button aria-label="Copiar código" onClick={copyCode}>
                <svg className={showSvg} id="Capa_1" x="0px" y="0px" viewBox="0 0 488.3 488.3">
                    <g>
                        <g>
                            <path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124    C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124    c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/>
                            <path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227    c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6    V38.6C439.65,17.3,422.35,0,401.05,0z"/>
                        </g>
                    </g>
                </svg>
                <span>{ buttonText }</span>
            </button>
        </code-block>
    );
}