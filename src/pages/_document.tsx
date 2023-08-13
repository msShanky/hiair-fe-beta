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
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link
						href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					/>
					{/* <link
						href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
						rel="stylesheet"
					/> */}
				</Head>
				<body className={pageProps.isDark ? "dark-mode" : "light-mode"}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
