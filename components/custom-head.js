// NextJS Core
import Head from 'next/head';

export default function CustomHead({ title, description, image, link, type, domain, date}) {

    return(
        <Head>
            {/* METAS */}
            <title>{ title }</title>
            <meta name="description" content={ description }></meta>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"></link>
            
            {/* FACEBOOK */}
            <meta property="og:url" content={ link } />
            <meta property="og:title" content={ title } />
            <meta property="og:description" content={ description } />
            <meta property="og:image" content={ image } />
            <meta property="og:image:secure_url" content={ image } />
            <meta property="og:type" content={ type } />
            <meta property="og:locale" content="es_ES" />
            <meta property="og:site_name" content="xaconi.dev" />

            {/* TWITTER */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@xaconi" />
            <meta name="twitter:domain" content={ domain } />
            <meta name="twitter:image:src" content={ image } />
            <meta name="twitter:site" content="@xaconi" />

            {/* MANIFEST */}
            <link rel="manifest" href="/manifest.json"></link>

            {/* LD+JSON */}
            {date != null ?
                <script type="application/ld+json">
                {`{
                    "@context":"http://schema.org",
                    "@type":"NewsArticle",
                    "headline":"${title}",
                    "image":["${image}"],
                    "datePublished":"${date}"
                    "author":"Nicolás Joel Giacconi Fernández"
                }`}
                </script>
                :
                <></>
            }
            
        </Head>
    );
}