import type { NextPage } from "next";
import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { useSession } from "next-auth/react";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { CandidateTable } from "@/components/feature/candidates";
import { IconUpload, IconX } from "@tabler/icons-react";
import { DropzoneButton } from "@/components/common/input";

const CandidatesPage: NextPage = () => {
	const { data: session, status } = useSession();
	const [isUpload, setUpload] = useState(false);
	const router = useRouter();

	if (!session && status !== "loading") {
		router.push("/un-authorized");
	}

	const buttonBase =
		"dark:text-black text-white dark:hover:text-primary active:text-secondaryYellow bg-primary dark:bg-primaryAlt hover:bg-primaryAlt group";

	return (
		<AppLayout title="Hiair Beta | candidates">
			<section className="flex flex-col mt-4 gap-y-4">
				<div className="flex justify-end">
					<Button
						onClick={() => setUpload(!isUpload)}
						className={buttonBase}
						classNames={{
							label: "flex gap-2",
						}}
					>
						{isUpload ? (
							<IconX className="w-4 h-4 stroke-red-600" />
						) : (
							<IconUpload className="w-4 h-4 dark:stroke-black stroke-white" />
						)}
						<p>{isUpload ? "Cancel Upload" : "Upload Candidates"}</p>
					</Button>
				</div>
				{isUpload ? <DropzoneButton /> : <CandidateTable />}
			</section>
		</AppLayout>
	);
};

export default CandidatesPage;
