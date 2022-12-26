import React, { FunctionComponent } from "react";
import AppNavigation from "./AppNavigation";

type AppHeaderProps = {};

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	return (
		<nav className="w-full mx-auto h-20">
			<AppNavigation />
		</nav>
	);
};

export default AppHeader;
