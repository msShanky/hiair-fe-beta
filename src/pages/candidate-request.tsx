import { useState } from "react";
import type { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { CandidateRequestCreation, CandidateRequestListing } from "@/components/feature/candidate_request";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const CandidateRequestPage: NextPage = () => {
	const [createRequest, shouldCreateRequest] = useState(false);
	const buttonBase =
		"dark:text-black group text-white dark:hover:text-primary hover:text-black active:text-secondaryYellow bg-primary dark:bg-primaryAlt hover:bg-secondaryYellow group";

	return (
		<AppLayout title="HiAir | Candidate Request">
			<>
				{!createRequest && (
					<div className="flex items-center justify-end h-16 px-4 mt-2 rounded-md bg-primaryAlt">
						<Button
							onClick={() => shouldCreateRequest(true)}
							className={buttonBase}
							classNames={{
								label: "flex gap-2",
							}}
						>
							<>
								<IconPlus className="w-4 h-4 dark:stroke-black stroke-white group-hover:stroke-black" />
								<p>Create Request</p>
							</>
						</Button>
					</div>
				)}
				{createRequest ? <CandidateRequestCreation /> : <CandidateRequestListing />}
			</>
		</AppLayout>
	);
};

export default CandidateRequestPage;
