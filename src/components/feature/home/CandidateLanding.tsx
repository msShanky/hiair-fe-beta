import React, { FC } from "react";
import { Title } from "@mantine/core";
import { Role } from "@prisma/client";

type UserLandingProps = {
	profileType: Role;
};

export const UserLanding: FC<UserLandingProps> = (props) => {
	const { profileType } = props;

	return (
		<section className="container flex flex-col items-center mx-auto mt-20">
			<Title className="mb-12 text-4xl font-light text-center text-black dark:text-white">
				{profileType === "CANDIDATE" ? "Candidate" : "Recruiter"} Landing page
			</Title>
		</section>
	);
};
