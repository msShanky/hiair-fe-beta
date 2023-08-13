import React, { FunctionComponent } from "react";
import AppNavigation from "./AppNavigation";

type AppHeaderProps = {};

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	return (
		<nav className="w-full h-20 mx-auto">
			<AppNavigation />
		</nav>
	);
};

export default AppHeader;
