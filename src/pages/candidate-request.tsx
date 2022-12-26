import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { OnBoardingLayout } from "@/components/layout";
import { CandidateRequestForm, CandidateTuning } from "@/components/feature/candidate_request";
import { updateCandidateRequest, updateCandidateTuning } from "@/reducer/userSession";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useRouter } from "next/router";

const CandidateRequestPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const userSession = useAppSelector((state) => state.userSession);
	const router = useRouter();
	const [showTuning, setShowTuning] = useState<boolean>(false);

	const handleCandidateRequestCreation = (values: CandidateRequestForm) => {
		// TODO: IF the session id is null then create a new session_id
		dispatch(updateCandidateRequest(values));
		setShowTuning(true);
	};

	 const handleCandidateTuning = async (values: CandidateTuningForm) => {
		// TODO: IF the session id is null then create a new session_id
		await dispatch(updateCandidateTuning(values));
		console.log("userSession ===> ", { ...userSession,  });
		router.push("/candidate-recommendation");
	};

	return (
		<OnBoardingLayout>
			<>
				<Head>
					<title>HiAir | Candidate Request</title>
				</Head>
				{!showTuning ? (
					<CandidateRequestForm
						initialFormValues={userSession.candidateRequest}
						// showTuning={(value) => setShowTuning(value)}
						handleFormSubmit={handleCandidateRequestCreation}
					/>
				) : (
					<CandidateTuning
						handleFormSubmit={handleCandidateTuning}
						initialFormValues={userSession.candidateSelectionTuning}
					/>
				)}
			</>
		</OnBoardingLayout>
	);
};

export default CandidateRequestPage;
