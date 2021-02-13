import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Node Code
import fs from 'fs';
import path from 'path';

// Libs
import Markdown from 'markdown-to-jsx';

export default function Home({ markdownContent }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Xaconi Site 👨‍💻</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="#">Xaconi Site!</a>
				</h1>
			</main>

			<section>
				<Markdown>{ markdownContent }</Markdown>
			</section>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</div>
  	)
}

export async function getStaticProps(context) {
	const postsDirectory = path.join(process.cwd(), 'posts');
	const filenames = fs.readdirSync(postsDirectory);

	const filePath = path.join(postsDirectory, 'test.md');
	const fileContents = fs.readFileSync(filePath, 'utf8');

	return {
	  	props: {
			markdownContent : fileContents
	  	},
	}
}