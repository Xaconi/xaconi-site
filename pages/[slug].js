// Styles
import styles from '../styles/Home.module.css'

// Components
import Article from '../components/article';
import CustomHead from '../components/custom-head';
import Header from '../components/header';
import Footer from '../components/footer';

// Services
import { getPostBySlug } from '../services/postsService';

// Hooks
import useGetDomain from '../hooks/useGetDomain';

export default function Post({ postContent }) {

    const domain = useGetDomain();

    return (
        <div className={styles.container}>
			<CustomHead
                title={ postContent.title }
                description={ postContent.description }
                image= { `${domain}/${postContent.image}` }
                link={ `${domain}/${postContent.link}` }
                type="article"
            >
            </CustomHead>

			<Header />

            {postContent.title != '' ?
                <section className={styles.section}>
                    <Article
                        title={ postContent.title }
                        image={ postContent.image }
                        content={ postContent.content }
                        link={ postContent.link }
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
                    title : post.attributes.title,
                    description : post.attributes.description,
                    image : post.attributes.image,
                    content : post.body,
                    link : post.attributes.link
                }
            }
        };
    }
    
}