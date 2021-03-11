// Styles
import styles from '../styles/Home.module.css'

// Components
import Article from '../components/article';
import Header from '../components/header';
import Footer from '../components/footer';
import CustomHead from '../components/custom-head';

// Services
import getLastPost from '../services/postsService';

// Hooks
import useGetDomain from '../hooks/useGetDomain';

export default function Home({ lastPost }) {
	
	const domain = useGetDomain();

	return (
		<div className={styles.container}>
			<CustomHead
                title="Xaconi.dev 👨‍💻"
                description="Posts sobre desarrollo web, FrontEnd (Angular, React, Vue, etc.), BackEnd (JavaScript, PHP, etc.) y buenas prácticas."
                image="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"
                link={ domain }
                type="web"
            >
            </CustomHead>

			<Header />

			<section className={styles.section}>
				<h1>Bienvenido a Xaconi.dev!🎉</h1>
				<p>Hola 👋! Soy Nicolás Joel Giacconi Fernández y soy programador! Aquí encontrarás mis posts sobre FrontEnd (Angular, Vue, React, NextJS...), BackEnd(JS, PHP...) y buenas prácticas. Me estoy forzando a escribir este blog para mejorar en mis habilidades de comunicación, y así aprovecho para aprender más cosas sobre el desarrollo web, que es mi profesión. Si tienes cualquier sugerencia, puedes enviarme una <code>Pull Request</code> al <a href="https://github.com/Xaconi/xaconi-site" target="_blank" rel="nofollow noopener noreferrer">repo público</a> de este blog y la reviso encantado.</p>
			</section>

			<section className={styles.section}>
				<h1>Último post</h1>
				<Article
					title={ lastPost.title }
					image={ lastPost.image }
					content={ lastPost.content }
					link={ lastPost.link }
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
				title : lastPost.attributes.title,
				description : lastPost.attributes.description,
				image : lastPost.attributes.image,
				content : lastPost.body,
				link : lastPost.attributes.link
			}
	  	},
	}
}