import Footer from "../components/footer";
import Header from "../components/header";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<div id="portal-root" />
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
