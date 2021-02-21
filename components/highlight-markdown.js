// React
import { useRef, useEffect } from 'react';

// Libs
import Markdown from 'markdown-to-jsx';
// import hljs from 'highlight.js';
import Prism from 'prismjs';

export default function HighLightMarkdown ({ children }) {
    useEffect(() => {
        // hljs.highlightAll();
        Prism.highlightAll();
    });

    return (
        <Markdown>{children}</Markdown>
    );
}