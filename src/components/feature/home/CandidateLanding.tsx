import React, { FC } from "react";
import { Title } from "@mantine/core";

type UserLandingProps = {};

export const CandidateLanding: FC<UserLandingProps> = (props) => {
	return (
		<section className="container flex flex-col items-center mx-auto mt-20">
			<Title className="mb-12 text-4xl font-light text-center text-black dark:text-white">Candidate Landing page</Title>
		</section>
	);
};
