import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserStateType = {
	user: undefined,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUserSession: (state, { payload }: PayloadAction<any>) => {
			state.user = payload;
		},
	},
});

const { actions, reducer } = userSlice;

export const { updateUserSession } = actions;

export default reducer;
