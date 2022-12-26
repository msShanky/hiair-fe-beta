import React, { FunctionComponent, ReactElement } from "react";
import { AppHeader, AppFooter } from "@/components/common";

type OnBoardingLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
};

const OnBoardingLayout: FunctionComponent<OnBoardingLayoutProps> = ({ children }) => {
	return (
		<>
			<AppHeader />
			<main className="mb-20">{children}</main>
		</>
	);
};

export default OnBoardingLayout;
