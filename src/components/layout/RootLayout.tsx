import React, { FunctionComponent, ReactElement } from "react";
import Head from "next/head";
import { AppHeader } from "@/components/common";

type RootLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
	title?: string;
};

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children, title }) => {
	return (
		<>
			{title && (
				<Head>
					<title>{title}</title>
				</Head>
			)}
			<AppHeader />
			<main>{children}</main>
		</>
	);
};

export default RootLayout;
