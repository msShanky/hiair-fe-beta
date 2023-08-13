import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hiairBaseApi = createApi({
	reducerPath: "hiairBaseApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	refetchOnFocus: true,
	endpoints: (builder) => ({
		getCandidateLocation: builder.query<CandidateLocationResponse, void>({
			query: () => `candidate-location`,
		}),
		getDashboard: builder.query<DashboardResponse, void>({
			query: () => `/user/dashboard`,
		}),
		getCandidateSkills: builder.query<CandidateSkillResponse, boolean>({
			query: (isTech) => `candidate-skills?isTech=${isTech}`,
		}),
		getCandidates: builder.query<CandidateResponse, number>({
			query: (pageNumber) => `candidates?page=${pageNumber}`,
		}),
		getCompanyInformationForUser: builder.query<CompanyResponse, void>({
			query: () => `/user/company-list`,
		}),
		storeUserSession: builder.mutation<SessionResponse, UserSessionStateType>({
			query: (postBody) => ({
				url: "user-session",
				method: "POST",
				body: postBody,
			}),
		}),
		getCandidateRequest: builder.query<CandidateRequestWithRelation, string>({
			query: (requestId) => ({
				url: `candidate-request?requestId=${requestId}`,
				method: "GET",
			}),
		}),
		storeUserFeedback: builder.mutation<UserFeedbackCreateResponse, UserCandidateFeedbackStateType>({
			query: (postBody) => ({
				url: "user-feedback",
				method: "POST",
				body: postBody,
			}),
		}),
		getMatchingCandidate: builder.mutation<CandidateResponse, CandidateMatchingRequestBody>({
			query: (postBody) => ({
				url: "candidates",
				method: "POST",
				body: postBody,
			}),
		}),
	}),
});

export const {
	useGetCandidateLocationQuery,
	useGetCandidateSkillsQuery,
	useStoreUserSessionMutation,
	useStoreUserFeedbackMutation,
	useGetMatchingCandidateMutation,
	useGetCandidatesQuery,
	useGetDashboardQuery,
	useGetCompanyInformationForUserQuery,
	useLazyGetCandidateRequestQuery
} = hiairBaseApi;
