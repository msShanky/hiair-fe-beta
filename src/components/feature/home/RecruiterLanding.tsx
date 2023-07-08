import React, { FC } from "react";
import { Button, Title } from "@mantine/core";
import { Role } from "@prisma/client";
import { LinkButton } from "@/components/common/header";
import { useRouter } from "next/router";

type RecruiterLandingProps = {
	profileType: Role;
};

export const RecruiterLanding: FC<RecruiterLandingProps> = (props) => {
	const { profileType } = props;
	const router = useRouter();

	const buttonBase =
		"text-black dark:hover:text-primary active:text-secondaryYellow bg-white hover:bg-primaryAlt";

	return (
		<>
			{/* <section className="container flex flex-col items-center mx-auto mt-20"> */}
			<div className="flex justify-end w-full gap-6 p-4 rounded-md bg-primary">
				<Button onClick={() => router.push("/candidates")} className={buttonBase}>
					Candidates
				</Button>
				<Button onClick={() => router.push("/request")} className={buttonBase}>
					Request
				</Button>
			</div>
			{/* </section> */}
		</>
	);
};
