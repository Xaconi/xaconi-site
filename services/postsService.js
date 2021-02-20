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

    markdownParsedContent.attributes.link = filenames[0].replace('.md', '');

    return markdownParsedContent;
}

export function getPostBySlug(slug) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const filenameFound = filenames.filter((filename) => filename === (slug + '.md'));

    let markdownParsedContent = null;

    if(filenameFound.length > 0) {
        const filePath = path.join(postsDirectory, filenameFound[0]);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        markdownParsedContent = fm(fileContents);

        markdownParsedContent.attributes.link = filenameFound[0].replace('.md', '');
    }

    return markdownParsedContent;
}

export function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    let posts = Array();

    if(filenames.length > 0) {
        filenames.map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');

            const fileContentsParsed = fm(fileContents);

            fileContentsParsed.attributes.link = filename.replace('.md', '');

            posts.push(fileContentsParsed);
        })
    }

    // Date DESC sort
    posts.sort((elementA, elementB) => {
        return new Date(elementB.attributes.date) - new Date(elementA.attributes.date);
    });

    return posts;
}