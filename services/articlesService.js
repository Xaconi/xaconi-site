// Node Core
import fs from 'fs';
import path from 'path';

// Libs
import fm from 'front-matter';

export default function getLastArticle() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const filePath = path.join(postsDirectory, 'test.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const markdownParsedContent = fm(fileContents);

    return markdownParsedContent;
}