// Components
import CodeBlock from '../components/code-block';

// Libs
import Markdown from 'markdown-to-jsx';

export default function HighLightMarkdown ({ children }) {
    return (
        <Markdown
            options={{
                overrides: {
                    pre: {
                        component: CodeBlock,
                    },
                },
            }}
        >
            {children}
        </Markdown>
    );
}