// NextJS
import Document, { Html, Head, Main, NextScript } from 'next/document'

// Components
import GoogleAnalytics from '../components/ga'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="es">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <GoogleAnalytics />
                </body>
            </Html>
        )
    }
}

export default MyDocument;