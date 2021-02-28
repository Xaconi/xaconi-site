// Styles
import styles from '../styles/Home.module.css'

// NextJS Core
import Head from 'next/head';

// Components
import Article from '../components/article';
import Header from '../components/header';
import Footer from '../components/footer';

// Services
import getLastPost from '../services/postsService';

export default function Home({ lastPost }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Xaconi.dev 👨‍💻</title>
				<meta name="description" content="Posts sobre desarrollo web, FrontEnd (Angular, React, Vue, etc.), BackEnd (JavaScript, PHP, etc.) y buenas prácticas."></meta>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<section className={styles.section}>
				<h1>Bienvenido a Xaconi.dev!🎉</h1>
				<p>Hola 👋! Soy Nicolás Joel Giacconi Fernández y soy programador! Aquí encontrarás mis posts sobre FrontEnd (Angular, Vue, React, NextJS...), BackEnd(JS, PHP...) y buenas prácticas. Me estoy forzando a escribir este blog para mejorar en mis habilidades de comunicación, y así aprovecho para aprender más cosas sobre el desarrollo web, que es mi profesión. Si tienes cualquier sugerencia, puedes enviarme una <code>Pull Request</code> al <a href="https://github.com/Xaconi/xaconi-site" target="_blank" rel="nofollow noopener noreferrer">repo público</a> de este blog y la reviso encantado.</p>
			</section>

			<section className={styles.section}>
				<h1>Último post</h1>
				<Article
					content={ lastPost.content }
					date={ lastPost.date }
					image={ lastPost.image ? lastPost.image : null }
					link={ lastPost.link }
					title={ lastPost.title }
				>
				</Article>
			</section>

			<Footer />
		</div>
  	)
}

export async function getStaticProps() {
	const lastPost = getLastPost();

	return {
	  	props: {
			lastPost : {
				content : lastPost.body,
				date : lastPost.attributes.date,
				description : lastPost.attributes.description,
				image : lastPost.attributes.image,
				link : lastPost.attributes.link,
				title : lastPost.attributes.title,
			}
	  	},
	}
}