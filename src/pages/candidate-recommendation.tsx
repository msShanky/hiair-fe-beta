import { useEffect, useRef, useState } from "react";
import { IconThumbUp, IconThumbDown } from "@tabler/icons-react";
import type { NextPage } from "next";
import Head from "next/head";
import { OnBoardingLayout } from "@/components/layout";
import {
	useGetMatchingCandidateMutation,
	useStoreUserFeedbackMutation,
	useLazyGetCandidateRequestByIDQuery,
} from "@/reducer/hiairBaseApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useRouter } from "next/router";
import {
	CandidateListCard,
	CandidateTrailCard,
	CandidateProfileDrawer,
	CandidateRatingModal,
	CandidateRequestInfo,
} from "@/components/feature";
import { Text, Title } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { initiateUserRecommendation, trackCandidateSelection } from "@/reducer/userCandidateFeedback";
import { Candidate } from "@prisma/client";

const sidePrompt = { hidden: { opacity: 0, x: -800 }, initial: { opacity: 1, x: 0 } };
const sidePromptRight = { hidden: { opacity: 0, x: 800 }, initial: { opacity: 1, x: 0 } };

const SESSION_COMPLETION_THRESHOLD = 5;

const CandidateRecommendationPage: NextPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const userSession = useAppSelector((state) => state.userSession);
	const userFeedback = useAppSelector((state) => state.userCandidateFeedback);
	const [activeIndex, setActiveIndex] = useState(0);

	const [isDragged, setDraggedState] = useState(false);
	const [shouldOpenSideOverlay, setSideOverlayState] = useState(false);
	const [shouldDisplayRatingOverlay, setRatingOverlayState] = useState(false);
	const [selectedCandidate, setSelectedCandidate] = useState<CandidateSelection | null>(null);
	const [activeCandidate, setActiveCandidate] = useState<CandidateWithScore | null>(null);

	// const dataFetchedRef = useRef(false);

	// const [postUserSession, userSessionResponse] = useStoreUserSessionMutation({
	// 	fixedCacheKey: "user-session",
	// 	selectFromResult: (values) => values,
	// });

	// TODO: Design the schema and store the data from recruiter feedback
	const [postUserFeedback, userFeedbackResponse] = useStoreUserFeedbackMutation({
		fixedCacheKey: "user-feedback",
		selectFromResult: (values) => values,
	});

	const [getCandidateRequest, { data: candidateRequest }] = useLazyGetCandidateRequestByIDQuery();

	const [getMatchingCandidates, { data: candidatesResponse }] = useGetMatchingCandidateMutation({
		fixedCacheKey: "candidates-matching",
		selectFromResult: (values) => values,
	});

	const { sessionId, userId } = userSession;
	const { sessionId: feedbackSessionId, userId: feedbackUserId, candidateFeedback } = userFeedback;
	// const { isLoading, isSuccess } = userFeedbackResponse;

	console.log("Candidates received ==> ", candidatesResponse);

	const availableCandidates = candidatesResponse?.result_count ?? 0;

	const sessionEndThreshold =
		availableCandidates !== 0 && availableCandidates < SESSION_COMPLETION_THRESHOLD
			? availableCandidates
			: SESSION_COMPLETION_THRESHOLD;

	// Use effect to fetch the candidate recommendation on load
	useEffect(() => {
		if (!router.query.requestId) return;
		getMatchingCandidates({ requestId: router.query.requestId as string });
		getCandidateRequest(router.query.requestId as string);
	}, [router, getMatchingCandidates, getCandidateRequest]);

	// Use effect to set the active candidate when the data is available from the api
	useEffect(() => {
		if (candidatesResponse?.data && activeIndex < candidatesResponse?.result_count) {
			// @ts-ignore
			const _activeCandidate = candidatesResponse?.data[activeIndex];
			setActiveCandidate(_activeCandidate);
		}
	}, [candidatesResponse, activeCandidate, activeIndex]);

	// Function to handle the candidate selection for both selection and rejection opens the overlay for rating
	const handleCandidateSelection = (isSelected: boolean) => {
		if (!activeCandidate) return;

		if (!feedbackSessionId || !feedbackUserId) {
			dispatch(initiateUserRecommendation({ sessionId, userId }));
		}

		setSelectedCandidate({ candidateId: activeCandidate.candidateId, candidateSelection: isSelected });

		if (candidatesResponse?.result_count && activeIndex < candidatesResponse?.result_count) {
			setActiveIndex(activeIndex + 1);
		}

		setTimeout(() => {
			setRatingOverlayState(true);
		}, 250);
	};

	const handleRatingsSubmit = (values: CandidateRatingForm) => {
		if (!selectedCandidate) return;

		const { candidateId, candidateSelection } = selectedCandidate;

		// FIXME: There is an error when tracking the candidateId all the candidate have the same id
		const updatedCandidateSelection: CandidateSelection = {
			candidateId,
			candidateSelection,
			candidateRating: values,
		};
		dispatch(trackCandidateSelection(updatedCandidateSelection));
		setRatingOverlayState(false);

		setTimeout(() => {
			setSelectedCandidate(null);
		}, 200);
	};

	const completeSession = () => {
		// TODO: Store the feedback data in the database
		postUserFeedback(userFeedback).then(() => {
			router.push("/session-complete");
		});
	};

	return (
		<OnBoardingLayout>
			<>
				<Head>
					<title>HiAir | Candidate Recommendation</title>
				</Head>
				<section className="container grid grid-cols-[40%_60%] mx-auto p-2">
					<aside className=" h-[80vh] overflow-scroll scrollbar-thumb-indigo-400 scrollbar-thin relative scrollbar-none">
						<Title className="text-2xl text-primary dark:text-secondaryYellow">Candidate Request</Title>
						{/* TODO: Handle request edit */}
						<CandidateRequestInfo candidateRequest={candidateRequest} />
						{/* TODO: Validate against the total required hiring count */}
						{candidateFeedback.length >= sessionEndThreshold && (
							<div className="flex justify-end w-full mt-10">
								<motion.button
									initial={{ opacity: 0, x: 100 }}
									animate={{ opacity: 1, x: 0 }}
									className="px-8 py-2 text-black rounded-md bg-secondaryYellow"
									onClick={() => completeSession()}
								>
									Complete Session
								</motion.button>
							</div>
						)}
					</aside>
					{/* TODO: Handle the no response scenario and display something else to advise recruiters to relax some options */}
					<section className="relative">
						<motion.div
							variants={sidePrompt}
							animate={isDragged ? "initial" : "hidden"}
							className="absolute inset-y-0 flex items-center h-full p-4 text-white left-10"
						>
							<div className="flex items-center justify-center w-20 h-20 rounded-full bg-success">
								<IconThumbUp size={40} />
							</div>
						</motion.div>
						<motion.div className="relative flex flex-col items-center overflow-hidden gap-y-10 h-[80vh] justify-center z-10">
							<AnimatePresence>
								{activeCandidate && (
									<CandidateListCard
										key={`candidate_card_${activeCandidate.candidateId}`}
										handleDragState={(value) => setDraggedState(value)}
										candidate={activeCandidate}
										handleCandidateSelection={(state) => handleCandidateSelection(state)}
										handleCandidateClick={() => setSideOverlayState(true)}
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
							{candidateFeedback.length < sessionEndThreshold && (
								<div className="flex justify-center">
									<Text className="px-4 py-2 text-center text-black rounded-md bg-secondaryYellow">
										Please complete more that {sessionEndThreshold} profiles to complete session
									</Text>
								</div>
							)}
						</div>
						<motion.div
							variants={sidePromptRight}
							animate={isDragged ? "initial" : "hidden"}
							className="absolute inset-y-0 flex items-center h-full p-4 text-white right-10"
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
						handleRatingsSubmit={handleRatingsSubmit}
					/>
				)}
				{activeCandidate && (
					<CandidateProfileDrawer
						isOpen={shouldOpenSideOverlay}
						onClose={() => setSideOverlayState(false)}
						candidate={activeCandidate}
						candidateRequest={candidateRequest}
					/>
				)}
			</>
		</OnBoardingLayout>
	);
};

export default CandidateRecommendationPage;
