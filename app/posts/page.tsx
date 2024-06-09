import styles from '../../styles/Home.module.css';
import stylesPosts from '../../styles/Posts.module.css'

import Header from '../../components/header';
import Footer from '../../components/footer';
import ArticleCard from '../../components/article-card';

import { getAllPosts } from '../../services/postsService';
import getBaseURL from '../../services/urlService';
import { getMetadata } from '@/services/metaData';

import { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
    title: "Xaconi.dev 👨‍💻 | Posts",
    description: "Aquí tienes la lista de posts de mi Blog. Artículos sobre FrontEnd (Angular, React, Vue, etc.), BackEnd (JavaScript, PHP, etc.) y buenas prácticas. Un poco de todo!",
    image: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>",
    link: `${getBaseURL('')}/posts`,
    type: "web",
    domain: getBaseURL('')
})

export default async function Posts() {

    const { baseURL, posts } = await getData()

    return (
        <div className={styles.container}>
            <Header />

            <section className={styles.section}>
                <h1>Mis Posts</h1>
                <div className={stylesPosts.articles}>
                    {posts.map((post) => {
                        return (
                            <ArticleCard
                                title={post.attributes.title}
                                description={post.attributes.description}
                                image={post.attributes.image}
                                link={post.attributes.link}
                                key={post.attributes.link}
                                date={post.attributes.date}
                            />
                        )
                    })}
                </div>
            </section>

            <Footer />
        </div>
    );
}


async function getData() {
    const posts = getAllPosts(true);
    const baseURL = getBaseURL('');

    return {
        posts,
        baseURL
    }
}