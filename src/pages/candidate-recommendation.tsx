import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { OnBoardingLayout } from "@/components/layout";
import { useStoreUserSessionMutation } from "@/reducer/hiairBaseApi";
import { useAppSelector } from "app/hooks";
import { useRouter } from "next/router";

const CandidateRecommendationPage: NextPage = () => {
	const userSession = useAppSelector((state) => state.userSession);
	const router = useRouter();
	const [postUserSession, userSessionResponse] = useStoreUserSessionMutation({
		fixedCacheKey: "user-session",
		selectFromResult: (values) => values,
	});

	console.log("postBody for API call ==> ", userSession);
	console.log(" user session response", userSessionResponse);

	useEffect(() => {
		if (userSessionResponse.isUninitialized && userSession.session_id !== "") {
			// postUserSession(userSession);
			console.log(" -------- CALL AN API -------- ");
		}
	}, [userSession.session_id, userSessionResponse.isUninitialized]);

	useEffect(() => {
		if (!userSession.session_id) {
			router.push("/onboarding");
		}
	}, [userSession, router]);

	return (
		<OnBoardingLayout>
			<>
				<Head>
					<title>HiAir | Candidate Recommendation</title>
				</Head>
				<div>Recommended candidates are shown here</div>
			</>
		</OnBoardingLayout>
	);
};

export default CandidateRecommendationPage;
