import React, { FC } from "react";
import { Button, Title } from "@mantine/core";
import { Role } from "@prisma/client";
import { LinkButton } from "@/components/common/header";
import { useRouter } from "next/router";

type RecruiterLandingProps = {};

export const RecruiterLanding: FC<RecruiterLandingProps> = (props) => {
	const router = useRouter();

	const buttonBase = "text-black dark:hover:text-primary active:text-secondaryYellow bg-white hover:bg-primaryAlt";

	return (
		<div className="flex justify-end w-full gap-6 p-4 rounded-md bg-primary">
			<Button onClick={() => router.push("/candidates")} className={buttonBase}>
				Candidates
			</Button>
			<Button onClick={() => router.push("/candidate-request")} className={buttonBase}>
				Request
			</Button>
		</div>
	);
};
