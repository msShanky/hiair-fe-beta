import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: UserCandidateFeedbackStateType = {
	sessionId: "",
	userId: "",
	candidateFeedback: [],
};

type UserRecommendation = {};

export const userFeedbackSlice = createSlice({
	name: "userCandidateRecommendation",
	initialState,
	reducers: {
		initiateUserRecommendation: (state, { payload }: PayloadAction<{ sessionId: string; userId: string }>) => {
			state.sessionId = payload.sessionId;
			state.userId = payload.userId;
		},
		trackCandidateSelection: (state, { payload }: PayloadAction<CandidateSelection>) => {
			const existingIndex = state.candidateFeedback.findIndex((value) => value.candidateId === payload.candidateId);
			if (existingIndex < 0) {
				state.candidateFeedback.push({ ...payload });
			}
		},
		resetUserFeedback: (state) => {
			state = initialState;
			return state;
		},
	},
});

const { actions, reducer } = userFeedbackSlice;

export const { initiateUserRecommendation, trackCandidateSelection, resetUserFeedback } = actions;

export default reducer;
