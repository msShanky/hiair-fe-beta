import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hiairBaseApi = createApi({
	reducerPath: "hiairBaseApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		getCandidateLocation: builder.query<CandidateLocationResponse, void>({
			query: () => `candidate-location`,
		}),
		getCandidateSkills: builder.query<CandidateLocationResponse, void>({
			query: () => `candidate-skills`,
		}),
		storeUserSession: builder.mutation<CandidateLocationResponse, UserSessionStateType>({
			query: (postBody) => ({
				url: "user-session",
				method: "POST",
				body: postBody,
			}),
		}),
		getMatchingCandidate: builder.mutation<CandidateLocationResponse, void>({
			query: () => `candidate-skills`,
		}),
	}),
});

export const { useGetCandidateLocationQuery, useGetCandidateSkillsQuery, useStoreUserSessionMutation } = hiairBaseApi;
