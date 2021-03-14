// Styles
import styles from '../styles/Home.module.css';
import stylesPosts from '../styles/Posts.module.css'

// NextJS Core
import Head from 'next/head';

// Components
import Header from '../components/header';
import Footer from '../components/footer';
import ArticleCard from '../components/article-card';
import CustomHead from '../components/custom-head';

// Services
import { getAllPosts } from '../services/postsService';

// Hooks
import useGetDomain from '../hooks/useGetDomain';

export default function Posts({ posts }) {

	const domain = useGetDomain();

    return(
        <div className={styles.container}>

			<CustomHead
                title="Xaconi.dev 👨‍💻 | Posts"
                description="Aquí tienes la lista de posts de mi Blog. Artículos sobre FrontEnd (Angular, React, Vue, etc.), BackEnd (JavaScript, PHP, etc.) y buenas prácticas. Un poco de todo!"
                image="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"
                link={ `${domain}/posts` }
                type="web"
				domain= { useGetDomain('') }
            >
            </CustomHead>

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


export async function getStaticProps() {
	const posts = getAllPosts();

	return {
	  	props: {
			posts
	  	},
	}
}