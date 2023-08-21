import { CandidateRequest } from "@prisma/client";
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
		getCandidates: builder.query<CandidateMatchResponse, number>({
			query: (pageNumber) => `candidates?page=${pageNumber}`,
		}),
		getCompanyInformationForUser: builder.query<CompanyResponseList, void>({
			query: () => `/user/company-list`,
		}),
		storeUserSession: builder.mutation<SessionResponse, UserSessionStateType>({
			query: (postBody) => ({
				url: "user-session",
				method: "POST",
				body: postBody,
			}),
		}),
		getCandidateRequestByID: builder.query<CandidateRequestResponse, string>({
			query: (requestId) => ({
				url: `candidate-request?requestId=${requestId}`,
				method: "GET",
			}),
		}),
		getCandidateRequest: builder.query<Array<CandidateRequest>, void>({
			query: () => ({
				url: `candidate-request`,
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
		getMatchingCandidate: builder.mutation<CandidateMatchResponse, CandidateMatchingRequestBody>({
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
	useLazyGetCandidateRequestByIDQuery,
	useGetCandidateRequestQuery,
} = hiairBaseApi;
