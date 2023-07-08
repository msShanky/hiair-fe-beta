import type { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { useSession } from "next-auth/react";
import { Button } from "@mantine/core";
import { UserLanding as CandidateLanding, RecruiterLanding } from "../components";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "helpers/api";
import { DropzoneButton } from "@/components/common/input";

const CandidatesPage: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	console.log("The user session ======> ", session);

	if (!session && status !== "loading") {
		router.push("/un-authorized");
	}

	const buttonBase = "text-black dark:hover:text-primary active:text-secondaryYellow bg-white hover:bg-primaryAlt";

	return (
		<AppLayout title="Hiair Beta">
			<section>
				{/* <Button onClick={() => router.push("/candidates")} className={buttonBase}>
					Upload 
				</Button> */}
				<DropzoneButton />
			</section>
		</AppLayout>
	);
};

export default CandidatesPage;
