// Node Core
import fs from 'fs';
import path from 'path';

// Libs
import fm from 'front-matter';

export default function getLastPost() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const filePath = path.join(postsDirectory, 'test.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const markdownParsedContent = fm(fileContents);

    return markdownParsedContent;
}

export function getPostBySlug(slug) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const filenameFound = filenames.filter((filename) => filename === (slug + '.md'));

    let markdownParsedContent = {};

    if(filenameFound.length > 0) {
        const filePath = path.join(postsDirectory, filenameFound[0]);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        markdownParsedContent = fm(fileContents);
    }

    return markdownParsedContent;
}