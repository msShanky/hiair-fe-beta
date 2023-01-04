import { useEffect, useRef, useState } from "react";
import { IconThumbUp, IconThumbDown } from "@tabler/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { OnBoardingLayout } from "@/components/layout";
import { useStoreUserSessionMutation, useGetMatchingCandidateMutation } from "@/reducer/hiairBaseApi";
import { useAppSelector } from "app/hooks";
import { useRouter } from "next/router";
import {
	CandidateListCard,
	CandidateTrailCard,
	UserInputDisplay,
	CandidateProfileDrawer,
	CandidateRatingModal,
} from "@/components/feature";
import { Text, Title } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

const sidePrompt = { hidden: { opacity: 0, x: -1000 }, initial: { opacity: 1, x: 0 } };
const sidePromptRight = { hidden: { opacity: 0, x: 1000 }, initial: { opacity: 1, x: 0 } };

const CandidateRecommendationPage: NextPage = () => {
	const router = useRouter();
	const userSession = useAppSelector((state) => state.userSession);
	const [activeIndex, setActiveIndex] = useState(0);

	const [isDragged, setDraggedState] = useState(false);
	const [shouldOpenSideOverlay, setSideOverlayState] = useState(false);
	const [shouldDisplayRatingOverlay, setRatingOverlayState] = useState(true);
	const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);

	const dataFetchedRef = useRef(false);

	const [postUserSession, userSessionResponse] = useStoreUserSessionMutation({
		fixedCacheKey: "user-session",
		selectFromResult: (values) => values,
	});

	const [getMatchingCandidates, { data: candidatesResponse }] = useGetMatchingCandidateMutation({
		fixedCacheKey: "candidates-matching",
		selectFromResult: (values) => values,
	});

	const { candidateRequest } = userSession;

	useEffect(() => {
		if (dataFetchedRef.current) return;
		if (userSessionResponse.isUninitialized && userSession.session_id !== "") {
			postUserSession(userSession);
			getMatchingCandidates({ session_id: userSession.session_id, ...userSession.candidateRequest });
			dataFetchedRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!userSession.session_id) {
			router.push("/onboarding");
		}
	}, [userSession, router]);

	useEffect(() => {
		if (candidatesResponse?.data) {
			setActiveCandidate(candidatesResponse?.data[activeIndex]);
		}
	}, [candidatesResponse, activeCandidate, activeIndex]);

	const handleCandidateSelection = (state: CandidateSelection, candidate: Candidate) => {
		setRatingOverlayState(true);
		if (state == "selected") {
			console.log("this candidate is selected", candidate);
		} else if (state == "rejected") {
			console.log("this candidate is rejected", candidate);
		}
		setActiveIndex(activeIndex + 1);
	};

	const handleCandidateClick = () => {
		setSideOverlayState(true);
	};

	return (
		<OnBoardingLayout>
			<>
				<Head>
					<title>HiAir | Candidate Recommendation</title>
				</Head>
				<section className="container grid grid-cols-[40%_60%] mx-auto p-2">
					<aside className=" h-[80vh] overflow-scroll scrollbar-thumb-indigo-400 scrollbar-thin ">
						<Title className="text-2xl text-primary dark:text-secondaryYellow">Candidate Request</Title>
						<div className="flex flex-row flex-wrap mt-4 gap-y-8 gap-x-20">
							{Object.keys(candidateRequest).map((candidateKey) => {
								return (
									<UserInputDisplay
										key={`candidate_request_${candidateKey}`}
										candidateKey={candidateKey as keyof typeof candidateRequest}
										candidateRequest={candidateRequest}
									/>
								);
							})}
						</div>
					</aside>
					<section className="relative">
						<motion.div
							variants={sidePrompt}
							animate={isDragged ? "initial" : "hidden"}
							className="absolute inset-y-0 flex items-center h-full p-4 text-white -left-24"
						>
							<div className="flex items-center justify-center w-20 h-20 rounded-full bg-primaryAlt">
								<IconThumbUp size={40} />
							</div>
						</motion.div>
						<motion.div className="relative flex flex-col items-center overflow-hidden gap-y-10 h-[80vh] justify-center z-10">
							<AnimatePresence>
								{activeCandidate && (
									<CandidateListCard
										key={`candidate_card_${activeCandidate._id}`}
										handleDragState={(value) => setDraggedState(value)}
										candidate={activeCandidate}
										handleCandidateSelection={(state) => handleCandidateSelection(state, activeCandidate)}
										handleCandidateClick={handleCandidateClick}
									/>
								)}
							</AnimatePresence>
							<CandidateTrailCard index={0} color="#1E40AF" />
							<CandidateTrailCard index={1} color="#3730A3" />
							<CandidateTrailCard index={2} color="#6B21A8" />
						</motion.div>
						<div className="absolute bottom-0 left-0 right-0 flex flex-col w-full mx-auto gap-y-2">
							<Text className="text-center">
								Please drag the card to right for rejecting the candidate and left for selection
							</Text>
						</div>
						<motion.div
							variants={sidePromptRight}
							animate={isDragged ? "initial" : "hidden"}
							className="absolute inset-y-0 flex items-center h-full p-4 text-white -right-24"
						>
							<div className="flex items-center justify-center w-20 h-20 bg-red-400 rounded-full">
								<IconThumbDown size={40} />
							</div>
						</motion.div>
					</section>
				</section>
				{activeCandidate && (
					<CandidateRatingModal
						isOpen={shouldDisplayRatingOverlay}
						onClose={() => setRatingOverlayState(false)}
						candidate={activeCandidate}
					/>
				)}
				{activeCandidate && (
					<CandidateProfileDrawer
						isOpen={shouldOpenSideOverlay}
						onClose={() => setSideOverlayState(false)}
						candidate={activeCandidate}
					/>
				)}
			</>
		</OnBoardingLayout>
	);
};

export default CandidateRecommendationPage;
