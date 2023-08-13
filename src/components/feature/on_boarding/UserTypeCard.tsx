import React, { FC } from "react";
import { Text } from "@mantine/core";
import Lottie from "react-lottie";
import * as jobSeekerAnimation from "helpers/animations/man-looking-through-binoculars.json";
import * as recruiterAnimation from "helpers/animations/employee-search.json";

type UserTypeCardProps = {
	label: string;
	cardType: "recruiter" | "candidate";
	handleClick: () => void;
};

export const UserTypeCard: FC<UserTypeCardProps> = (props) => {
	const { label, cardType, handleClick } = props;

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: cardType === "candidate" ? jobSeekerAnimation : recruiterAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div
			onClick={handleClick}
			className="flex flex-col items-center gap-4 p-6 rounded-md bg-zinc-200 hover:bg-secondaryYellow group w-72"
		>
			<Lottie options={defaultOptions} height={250} width={250} />
			<Text className="text-3xl font-light text-primary group-hover:text-white">{label}</Text>
		</div>
	);
};
