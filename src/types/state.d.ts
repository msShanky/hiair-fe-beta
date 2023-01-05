type UserSessionStateType = {
	sessionId: string;
	userId: string;
	onBoardingInfo: OnBoardingForm;
	candidateRequest: CandidateRequestForm;
	candidateSelectionTuning: CandidateTuningForm;
};

type CandidateRecommendation = {
	candidate_id: string;
};

type UserCandidateFeedbackStateType = {
	sessionId: string;
	userId: string;
	candidateFeedback: Array<CandidateSelection>;
};

type UserStateType = {
	user: any;
};
