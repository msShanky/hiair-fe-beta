import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: UserSessionStateType = {
	sessionId: "",
	userId: "",
	companyInfo: {
		name: "",
		about: "",
		currentRole: "",
		expectedHiringCount: 0,
		industry: "",
		address: "",
		companyType: "",
		companySize: 0,
	},
	companyId: null,
	candidateRequest: {
		jobTitle: "",
		jobLocation: [],
		salaryRange: [0, 6],
		experience: [0, 3],
		availablePosition: 0,
		keySkills: [],
		expectedJoiningDate: [],
		educationQualification: "Any Degree",
		modeOfWork: "remote",
		rawJD: "",
	},
	candidateSelectionTuning: {
		experience: 50,
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
		updateCompanyInfo: (state, { payload }: PayloadAction<CompanyInformationFormState>) => {
			state.companyInfo = payload;
		},
		selectCompany: (state, { payload }: PayloadAction<number>) => {
			state.companyId = payload;
		},
		createUserSession: (state, { payload }: PayloadAction<{ sessionId: string; userId: string }>) => {
			state.sessionId = payload.sessionId;
		},
		updateCandidateRequest: (state, { payload }: PayloadAction<CandidateRequest>) => {
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

export const {
	updateCompanyInfo,
	createUserSession,
	updateCandidateRequest,
	updateCandidateTuning,
	resetUserSession,
	selectCompany,
} = actions;

export default reducer;
