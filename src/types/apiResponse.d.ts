type ApiResponse<T> = {
	success: boolean;
	result_count: number;
	data: T;
};

type CandidateLocationResponse = ApiResponse<Array<string>>;

type CandidateSkillResponse = ApiResponse<Array<string>>;

type UserSessionCreateResponse = ApiResponse<UserSessionStateType>;