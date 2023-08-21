type ApiResponse<T> = {
	success: boolean;
	result_count: number;
	data: T;
};

type UserWithRelation = import("@prisma/client").User & {
	userProfile: Array<import("@prisma/client").UserProfile>;
};

type CandidateLocationResponse = ApiResponse<Array<{ label: string; value: string }>>;

type CandidateSkillResponse = ApiResponse<Array<{ label: string; value: string }>>;

type UserSessionCreateResponse = ApiResponse<UserSessionStateType>;

type SessionResponse = {
	companyInformation: import("@prisma/client").CompanyInformation;
	candidateRequest: import("@prisma/client").CandidateRequest;
};

type CandidateMatchResponse = ApiResponse<CandidateWithScore>;

type UserCompanyMappingWithRelation = import("@prisma/client").UserCompanyMapping & {
	company: import("@prisma/client").CompanyInformation;
};

type CompanyResponseList = Array<UserCompanyMappingWithRelation>;

type UserFeedbackCreateResponse = ApiResponse<UserCandidateFeedbackStateType>;

type DashboardJobPoolStats = {
	candidateCount: number;
	desiredLocationCount: number;
	candidateLocationCount: number;
	candidateSkillCount: number;
	candidateTitleCount: number;
	totalLocations: number;
	totalNonTechSkills: number;
	totalTechSkills: number;
	topLocations: Array<import("@prisma/client").Location & { count: number }>;
	topSkills: Array<import("@prisma/client").Skill & { count: number }>;
};

type DashboardResponse = {
	jobPoolStats: DashboardJobPoolStats;
	userStats: {};
};
