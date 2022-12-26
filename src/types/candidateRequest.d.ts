type CandidateRequestForm = {
	role?: string;
	domain?: string;
	industry?: string;
	experience?: string;
	job_location?: Array<string>;
	skill_set: Array<string>;
	notice_period?: Array<number>;
	salary_range?: Array<number>;
	turn_around_time?: number;
	required_profile?: number;
};

type CandidateTuningForm = {
	skills: number;
	experience: number;
	salary: number;
	location: number;
	industry: number;
	domain: number;
	notice_period: number;
};

type CandidateRequestCreationPostBody = CandidateRequestForm & {
	session_id: string;
};
