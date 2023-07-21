import React, { FunctionComponent, ReactElement } from "react";
import Head from "next/head";
import { AppHeader } from "@/components/common";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
	title?: string;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children, title }) => {
	return (
		<>
			{title && (
				<Head>
					<title>{title}</title>
				</Head>
			)}
			<AppHeader />
			<main className="container px-2 mx-auto">{children}</main>
		</>
	);
};

export default AppLayout;
