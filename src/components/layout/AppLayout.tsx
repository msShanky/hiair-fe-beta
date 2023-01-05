import React, { FunctionComponent, ReactElement } from "react";
import { AppHeader, AppFooter } from "@/components/common";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
	return (
		<>
			<AppHeader />
			<main>{children}</main>
			<AppFooter />
		</>
	);
};

export default AppLayout;
