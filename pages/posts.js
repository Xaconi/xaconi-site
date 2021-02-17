// Styles
import styles from '../styles/Home.module.css';
import stylesPosts from '../styles/Posts.module.css'

// NextJS Core
import Head from 'next/head';

// Components
import Header from '../components/header';
import Footer from '../components/footer';
import ArticleCard from '../components/article-card';

// Services
import { getAllPosts } from '../services/postsService';

export default function Posts({ posts }) {
    return(
        <div className={styles.container}>
			<Head>
				<title>Xaconi Site 👨‍💻</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

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
							/>
						)
					})}
				</div>
			</section>

			<Footer />
		</div>
    );
}


export async function getStaticProps() {
	const posts = getAllPosts();

	return {
	  	props: {
			posts
	  	},
	}
}