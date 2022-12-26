import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: UserSessionStateType = {
	session_id: "",
	user_id: "aaaa",
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
			if (state.session_id === "") {
				state.session_id = nanoid();
			}
			state.onBoardingInfo = payload;
		},
		updateSessionId: (state, { payload }: PayloadAction<string>) => {
			state.session_id = payload;
		},
		updateCandidateRequest: (state, { payload }: PayloadAction<CandidateRequestForm>) => {
			if (state.session_id === "") {
				state.session_id = nanoid();
			}
			state.candidateRequest = payload;
		},
		updateCandidateTuning: (state, { payload }: PayloadAction<CandidateTuningForm>) => {
			if (state.session_id === "") {
				state.session_id = nanoid();
			}
			state.candidateSelectionTuning = payload;
		},
	},
});

const { actions, reducer } = userSlice;

export const { updateOnBoarding, updateSessionId, updateCandidateRequest, updateCandidateTuning } = actions;

export default reducer;
