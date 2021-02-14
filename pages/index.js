// Styles
import styles from '../styles/Home.module.css'

// NextJS Core
import Head from 'next/head';

// Components
import Article from '../components/article';
import Header from '../components/header';
import Footer from '../components/footer';

// Hooks
import getLastArticle from '../services/articlesService';

export default function Home({ markdownContent }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Xaconi Site 👨‍💻</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header></Header>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="#">Xaconi Site!</a>
				</h1>
			</main>

			<section>
				<Article
					title={ markdownContent.title }
					image={ markdownContent.image }
					content={ markdownContent.content }>
				</Article>
			</section>

			<Footer></Footer>
		</div>
  	)
}

export async function getStaticProps() {
	const mardownFrontData = getLastArticle();

	return {
	  	props: {
			markdownContent : {
				title : mardownFrontData.attributes.title,
				description : mardownFrontData.attributes.description,
				image : mardownFrontData.attributes.image,
				content : mardownFrontData.body
			}
	  	},
	}
}