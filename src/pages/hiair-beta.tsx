import type { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { useSession } from "next-auth/react";
import { CandidateLanding, RecruiterLanding } from "../components";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "helpers/api";
import { EmployeeSearch } from "@/components/common/loader";

const HiairBetaPage: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { data } = useQuery({ queryKey: ["user"], queryFn: getUser });

	if (!session && status !== "loading") {
		router.push("/un-authorized");
	}

	if (status === "loading" && data && data?.userProfile.length > 0) {
		return (
			<AppLayout title="Hiair Beta">
				<EmployeeSearch />
			</AppLayout>
		);
	}

	if (session && data && data.userProfile.length <= 0) {
		router.push("/onboarding");
	}

	return (
		<AppLayout title="Hiair Beta">
			{data && data.userProfile.length > 0 && data?.userProfile[0].userType === "CANDIDATE" ? (
				<CandidateLanding />
			) : (
				<RecruiterLanding />
			)}
		</AppLayout>
	);
};

export default HiairBetaPage;
