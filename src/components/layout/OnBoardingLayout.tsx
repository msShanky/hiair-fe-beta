import React, { FunctionComponent, ReactElement } from "react";
import { AppHeader } from "@/components/common";
import Head from "next/head";

type OnBoardingLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
	title?: string;
};

const OnBoardingLayout: FunctionComponent<OnBoardingLayoutProps> = ({ children, title }) => {
	return (
		<>
			{title && (
				<Head>
					<title>{title}</title>
				</Head>
			)}
			<AppHeader />
			<main className="container p-2 mx-auto mb-20 overflow-hidden">{children}</main>
		</>
	);
};

export default OnBoardingLayout;
