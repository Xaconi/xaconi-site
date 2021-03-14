// Styles
import styles from '../styles/Home.module.css'

// Components
import Article from '../components/article';
import CustomHead from '../components/custom-head';
import Header from '../components/header';
import Footer from '../components/footer';

// Services
import { getPostBySlug } from '../services/postsService';

export default function Post({ postContent }) {

    return (
        <div className={styles.container}>
			<CustomHead
                title={ postContent.title }
                description={ postContent.description }
                image= { `/api/social-image/${postContent.link}.jpg` }
                link={ `/${postContent.link}` }
                type="article"
            >
            </CustomHead>

			<Header />

            {postContent.title != '' ?
                <section className={styles.section}>
                    <Article
                        content={ postContent.content }
                        date={ postContent.date }
                        image={ postContent.image }
                        link={ postContent.link }
                        title={ postContent.title }
                    >
                    </Article>
                </section>
                :
                <>
                    404
                </>
            }

			<Footer />
		</div>
    );
}

export async function getServerSideProps({ params, res }) {
    const post = getPostBySlug(params.slug);

    if(post === null) {
        res.statusCode = 404;
        return {
            props : {
                postContent : {
                    title : '',
                    description : '',
                    image : '',
                    content : ''
                }
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
                }
            }
        };
    }
}