// Styles
import styles from '../styles/Home.module.css'

// NextJS Core
import Head from 'next/head';

// Components
import Article from '../components/article';
import Header from '../components/header';
import Footer from '../components/footer';

// Services
import { getPostBySlug } from '../services/postsService';

export default function Post({ postContent }) {
    return (
        <div className={styles.container}>
			<Head>
				<title>Xaconi Site 👨‍💻</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<section className={styles.section}>
				<Article
					title={ postContent.title }
					image={ postContent.image }
					content={ postContent.content }>
				</Article>
			</section>

			<Footer />
		</div>
    );
}

export async function getServerSideProps({params}) {
    const post = getPostBySlug(params.slug);

    return{
        props : {
            postContent : {
				title : post.attributes.title,
				description : post.attributes.description,
				image : post.attributes.image,
				content : post.body
			}
        }
    };
}