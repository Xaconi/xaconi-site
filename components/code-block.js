// React
import { useEffect } from 'react';

// Libs 
import Prism from 'prismjs';

export default function CodeBlock({ children }) {
    const language = children.props.className.replace('lang-', '');
    useEffect(() => {
        Prism.highlightAll();
    });

    return(
        <code-block data-lang={language}>
            <pre className={`  language-${language}`}>
                <code className={`  language-${language}`}>
                    { children.props.children }
                </code>
            </pre>
        </code-block>
    );
}