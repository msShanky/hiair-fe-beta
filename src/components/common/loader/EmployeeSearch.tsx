import React from "react";
import Lottie from "react-lottie";
import * as employeeSearch from "helpers/animations/employee-search.json";

export const EmployeeSearch = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: employeeSearch,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<div className="flex items-center justify-center w-full">
			<Lottie options={defaultOptions} height={500} width={450} />
		</div>
	);
};
