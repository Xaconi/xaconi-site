// React
import { useEffect } from 'react';

// Libs 
import Prism from 'prismjs';

export default function CodeBlock({ children }) {
    useEffect(() => {
        Prism.highlightAll();
    });

    return(
        <pre className="  language-javascript">
            <code className="  language-javascript">
                { children.props.children }
            </code>
        </pre>
    );
}