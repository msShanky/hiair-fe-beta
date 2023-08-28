type CompanyInformationFormState = {
	name: string;
	currentRole: string;
	address: string;
	companySize: number;
	companyType: string;
	expectedHiringCount: number;
	about: string;
	industry?: string;
	domain?: string;
	website?: string;
	contactInfo?: string;
	linkedinLink?: string;
	twitterLink?: string;
	facebookLink?: string;
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
	companyId: number | undefined;
	companyInfo: CompanyInformationFormState;
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
