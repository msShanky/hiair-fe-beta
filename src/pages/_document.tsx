import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;

		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link
						href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700;900&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className={pageProps.isDark ? "dark-mode" : "light-mode"}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
