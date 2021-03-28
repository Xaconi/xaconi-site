// Styles
import styles from '../styles/Home.module.css'

// Components
import Article from '../components/article';
import CustomHead from '../components/custom-head';
import Header from '../components/header';
import Footer from '../components/footer';
import Page404 from '../components/404';

// Services
import { getAllPosts, getPostBySlug } from '../services/postsService';
import getBaseURL from '../services/urlService';

export default function Post({ postContent, baseURL }) {

    return (
        <div className={styles.container}>

            {postContent.title != '' ?
                <>
                    <CustomHead
                        title={ postContent.title }
                        description={ postContent.description }
                        image= { `${baseURL}/api/social-image/${postContent.link}.jpg` }
                        link={ `${baseURL}/${postContent.link}` }
                        type="article"
                        domain={ `${baseURL}` }
                        date={ `${postContent.date}` }
                    >
                    </CustomHead>

                    <Header />
                    
                    <section className={styles.section}>
                        <Article
                            content={ postContent.content }
                            date={ postContent.date }
                            image={ postContent.image }
                            link={ `${baseURL}/${postContent.link}` }
                            title={ postContent.title }
                        >
                        </Article>
                    </section>

                    <Footer />
                </>
                :
                <Page404 />
            }
		</div>
    );
}

export async function getStaticProps({ params, res }) {
    const post = getPostBySlug(params.slug);
    const baseURL = getBaseURL('');

    if(post === null) {
        res.statusCode = 404;
        return {
            props : {
                postContent : {
                    title : '',
                    description : '',
                    image : '',
                    content : ''
                },
                baseURL
            }
        };    
    } else {
        return{
            props : {
                postContent : {
                    content : post.body,
                    date: post.attributes.date,
                    description : post.attributes.description,
                    image : post.attributes.image,
                    link : post.attributes.link,
                    title : post.attributes.title,
                },
                baseURL
            }
        };
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPosts();

    return {
        paths: allPosts.map(
            (post) => `/${post.attributes.link}`
        ),
        fallback: false
    }
}