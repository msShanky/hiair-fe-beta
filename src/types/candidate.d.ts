type CandidateRequestForm = {
	role?: string;
	experience?: string;
	job_location?: Array<string>;
	skill_set: Array<string>;
	notice_period?: Array<number>;
	salary_range?: Array<number>;
	// These fields below are not tracked for rating
	domain?: string;
	industry?: string;
	turn_around_time?: number;
	required_profile?: number;
};

type CandidateTuningForm = {
	skills: number;
	experience: number;
	salary: number;
	location: number;
	notice_period: number;
};

type CandidateRequestCreationPostBody = CandidateRequestForm & {
	sessionId: string;
};

type CandidateMatchingRequestBody = {
	requestId: string;
};

type FieldsForRating = Omit<CandidateRequestForm, "domain" | "industry" | "turn_around_time" | "required_profile">;

type CandidateRatingFields = Array<keyof FieldsForRating>;

type CandidateRatingForm = Record<keyof FieldsForRating, number>;

type CandidateSelection = {
	candidateId: string;
	candidateSelection: boolean;
	candidateRating?: CandidateRatingForm;
};

type DesiredLocationMapping = import("@prisma/client").CandidateDesiredLocationMapping & {
	location: import("@prisma/client").Location;
};

type SkillMapping = import("@prisma/client").CandidateSkillMapping & {
	skill: import("@prisma/client").Skill;
};

type CandidateWithRelation = import("@prisma/client").Candidate & {
	location?: import("@prisma/client").Location;
	desiredLocations?: Array<DesiredLocationMapping>;
	skills?: Array<SkillMapping>;
};

type CandidateRequestWithRelation = import("@prisma/client").CandidateRequest & {
	candidateTuning: Array<import("@prisma/client").CandidateTuning>;
};
