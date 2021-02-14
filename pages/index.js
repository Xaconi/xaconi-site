// Styles
import styles from '../styles/Home.module.css'

// NextJS Core
import Head from 'next/head';

// Components
import Article from '../components/article';
import Header from '../components/header';
import Footer from '../components/footer';

// Hooks
import getLastPost from '../services/postsService';

export default function Home({ markdownContent }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Xaconi Site 👨‍💻</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header></Header>

			<section className={styles.section}>
				<h1>Bienvenido a Xaconi.dev!🎉</h1>
				<p>Aquí encontrarás mis posts sobre FrontEnd (Angular, Vue, React, NextJS...), BackEnd(JS, PHP...) y buenas prácticas. ME estoy forzando a escribir este blog para mejorar en mis habilidades de comunicación, y así aprovecho para aprender más cosas sobre el desarrollo web. Si tienes cualquier sugerencia, puedes enviarme una <code>Pull Request</code> al <a href="" target="_blank">repo público</a> de este blog y la reviso encantado.</p>
			</section>

			<section className={styles.section}>
				<h1>Último post</h1>
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
	const mardownFrontData = getLastPost();

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