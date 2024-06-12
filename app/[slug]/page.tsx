import Article from '../../components/article';

import { getAllPosts, getPostBySlug } from '../../services/postsService';
import getBaseURL from '../../services/urlService';
import { getMetadata } from '../../services/metaData';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { postContent, baseURL } = await getData(params.slug)

    return getMetadata({
        title: postContent.title,
        description: postContent.description,
        image: `${getBaseURL('')}/api/og?slug=${postContent.link}`,
        link: `${getBaseURL('')}/${postContent.link}`,
        type: "article",
        domain: getBaseURL(''),
        date: postContent.date
    })
}

export default async function Post({ params }: { params: { slug: string } }) {

    const { postContent, baseURL } = await getData(params.slug)

    if (postContent.title == '') notFound()

    return (
        <>
            <Article
                content={postContent.content}
                date={postContent.date}
                image={postContent.image}
                link={`${baseURL}/${postContent.link}`}
                title={postContent.title}
            >
            </Article>
        </>
    );
}

async function getData(slug: string | Array<string> | undefined) {
    const post = getPostBySlug(slug);
    const baseURL = getBaseURL('');

    if (post === null) {
        return {
            postContent: {
                title: '',
                description: '',
                image: '',
                content: ''
            },
            baseURL
        };
    } else {
        return {
            postContent: {
                content: post.body,
                date: post.attributes.date,
                description: post.attributes.description,
                image: post.attributes.image,
                link: post.attributes.link,
                title: post.attributes.title,
            },
            baseURL
        };
    }
}

export async function generateStaticParams() {
    const allPosts = await getAllPosts();

    return allPosts.map(post => ({
        slug: post.attributes.link
    }))
}