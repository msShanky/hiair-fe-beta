type CompanyInformation = {
	name: string;
	currentRole: string;
	expectedHiringCount: number;
	industry: string;
	companySize: number;
	companyType?: string;
	about?: string;
};

type CandidateRequest = {
	jobTitle: string;
	experience: Array<number>;
	salaryRange: Array<number>;
	jobLocation: Array<string>;
	availablePosition: number;
	keySkills: Array<string>;
	optionalSkills?: Array<string>;
	expectedJoiningDate: Array<string>; // in months
	educationQualification: string;
	modeOfWork?: string;
	rawJD?: string;
};

type UserSessionStateType = {
	sessionId: string;
	userId: string;
	companyInfo: CompanyInformation;
	candidateRequest: CandidateRequest;
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
