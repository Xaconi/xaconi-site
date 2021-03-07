// React
import { useState } from 'react';

export default function useCopyToClipboard() {

    const [ isCopied, setCopied ] = useState();

    function handleCopy(text) {
        var data = [new ClipboardItem({ 
            "text/plain": new Blob(
                [text], 
                { type: "text/plain" }
            ) 
        })];
        navigator.clipboard.write(data);
        setCopied(true);
    }

    return [ isCopied, handleCopy ];
}