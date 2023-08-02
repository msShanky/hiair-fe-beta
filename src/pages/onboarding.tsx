import type { NextPage } from "next";
import { useState } from "react";
import { OnBoardingLayout } from "@/components/layout";
import { useRouter } from "next/router";
import { Title } from "@mantine/core";
import { UserTypeCard } from "@/components/feature/on_boarding";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getUser, setUserProfile } from "helpers/api";
import { EmployeeSearch } from "@/components/common/loader";

const queryClient = new QueryClient();
// TODO: Read user session here and display a loader if the information is being retrieved
const OnBoardingPage: NextPage = () => {
	const router = useRouter();
	const { data, isLoading } = useQuery({ queryKey: ["user"], queryFn: getUser });

	const { mutate } = useMutation({
		mutationFn: setUserProfile,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["user"] });
			router.push("/hiair-beta");
		},
	});

	if (data && data?.userProfile.length > 0) {
		router.push("/hiair-beta");
	}

	const handleUserSelection = (cardType: string) => {
		mutate({ type: cardType });
	};

	return (
		<OnBoardingLayout title="HiAir | On Boarding">
			{isLoading || !data ? (
				<EmployeeSearch />
			) : (
				<>
					<section className="w-8/12 h-[80vh] flex flex-col items-center mx-auto gap-y-12 mt-12">
						<Title className="font-sans font-normal text-primaryAlt">
							Please select the role, so we can curate the content better.
						</Title>
						<div className="flex items-center justify-center gap-10 mx-auto mt-2 rounded-2xl">
							<UserTypeCard
								label="Recruiter"
								cardType="recruiter"
								handleClick={() => handleUserSelection("recruiter")}
							/>
							<UserTypeCard
								label="Job Seeker"
								cardType="candidate"
								handleClick={() => handleUserSelection("candidate")}
							/>
						</div>
					</section>
				</>
			)}
		</OnBoardingLayout>
	);
};

export default OnBoardingPage;
