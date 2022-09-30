import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	const [footerHeight, setFooterHeight] = useState();
	useEffect(() => {
		if (document.getElementsByTagName("footer")[0]) {
			setFooterHeight(
				document.getElementsByTagName("footer")[0].offsetHeight
			);
		}
	}, []);
	return (
		<>
			<div id="portal-root" />
			<Header />
			<Component {...pageProps} footerHeight={footerHeight} />
			<Footer />
		</>
	);
}

export default MyApp;
