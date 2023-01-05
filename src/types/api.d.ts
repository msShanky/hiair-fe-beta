type ApiResponse<T> = {
	success: boolean;
	result_count: number;
	data: T;
};

type CandidateLocationResponse = ApiResponse<Array<string>>;

type CandidateSkillResponse = ApiResponse<Array<string>>;

type UserSessionCreateResponse = ApiResponse<UserSessionStateType>;

type Candidate = {
	_id: string;
	Index: number;
	first_name: string;
	last_name: string;
	full_name: string;
	occupation?: string;
	headline?: string;
	summary?: string;
	experience?: Array<any>;
	education?: Array<any>;
	industry?: string;
	skills?: Array<string>;
	city?: string;
	state: string;
	country: string;
	total_experience: number;
	notice_period: number;
	current_ctc: number;
	user_id: string;
};

type CandidateResponse = ApiResponse<Array<Candidate>>;


type UserFeedbackCreateResponse = ApiResponse<UserCandidateFeedbackStateType>