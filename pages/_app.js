import '../styles/globals.css';
import '../styles/code-js-syntax.css';
import '../styles/code-html-syntax.css';

// NextJS Core
import { useRouter } from "next/router";

// React
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	if(process.env.NODE_ENV != 'development') {
		useEffect(() => {
			const handleRouteChange = (url) => {
				/* invoke analytics function only for production */
				ga('send', 'pageview', url);
			};
			router.events.on("routeChangeComplete", handleRouteChange);
			return () => {
				router.events.off("routeChangeComplete", handleRouteChange);
			};
		}, [router.events]);
	}
	return <Component {...pageProps} />
}

export default MyApp
