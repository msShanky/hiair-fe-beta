import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: UserSessionStateType = {
	sessionId: "",
	userId: "",
	onBoardingInfo: {
		firstName: "",
		role: "",
		expected_hiring_count: 0,
		gender: "male",
		lastName: "",
		organization: "",
	},
	candidateRequest: {
		skill_set: [],
		domain: "",
		experience: "",
		industry: "",
		job_location: [],
		notice_period: [],
		required_profile: 0,
		role: "",
		salary_range: [4, 12],
		turn_around_time: 0,
	},
	candidateSelectionTuning: {
		domain: 50,
		experience: 50,
		industry: 50,
		location: 50,
		notice_period: 50,
		salary: 50,
		skills: 50,
	},
};

export const userSlice = createSlice({
	name: "userSession",
	initialState,
	reducers: {
		updateOnBoarding: (state, { payload }: PayloadAction<OnBoardingForm>) => {
			// if (state.sessionId === "" || state.) {
			// 	state.sessionId = nanoid();
			// 	state.
			// }
			state.onBoardingInfo = payload;
		},
		createUserSession: (state, { payload }: PayloadAction<{ sessionId: string; userId: string }>) => {
			state.sessionId = payload.sessionId;
			state.userId = payload.userId;
		},
		updateCandidateRequest: (state, { payload }: PayloadAction<CandidateRequestForm>) => {
			if (state.sessionId === "") {
				state.sessionId = nanoid();
			}
			state.candidateRequest = payload;
		},
		updateCandidateTuning: (state, { payload }: PayloadAction<CandidateTuningForm>) => {
			if (state.sessionId === "") {
				state.sessionId = nanoid();
			}
			state.candidateSelectionTuning = payload;
		},
		resetUserSession: (state) => {
			state = initialState;
			return state;
		},
	},
});

const { actions, reducer } = userSlice;

export const { updateOnBoarding, createUserSession, updateCandidateRequest, updateCandidateTuning, resetUserSession } =
	actions;

export default reducer;
