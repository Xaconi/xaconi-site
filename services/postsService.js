// Node Core
import fs from 'fs';
import path from 'path';

// Libs
import fm from 'front-matter';

export default function getLastPost() {
    const posts = getAllPosts(true);

    return posts[0];
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

        if(typeof markdownParsedContent.attributes.image == 'undefined')
		    markdownParsedContent.attributes.image = null;
    }

    return markdownParsedContent;
}

export function getAllPosts(onlyActive = false) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    let posts = Array();

    if(filenames.length > 0) {
        filenames.map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');

            const fileContentsParsed = fm(fileContents);

            fileContentsParsed.attributes.link = filename.replace('.md', '');

            if(typeof fileContentsParsed.attributes.image == 'undefined')
		        fileContentsParsed.attributes.image = null;

            if(onlyActive && fileContentsParsed.attributes.active != false)
                posts.push(fileContentsParsed);
            else if(!onlyActive)
                posts.push(fileContentsParsed);
        })
    }

    // Date DESC sort
    posts.sort((elementA, elementB) => {
        return new Date(elementB.attributes.date) - new Date(elementA.attributes.date);
    });

    return posts;
}