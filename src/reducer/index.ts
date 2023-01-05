import { hiairBaseApi } from "./hiairBaseApi";
import userSession from "./userSession";
import userCandidateFeedback from "./userCandidateFeedback";
import userReducer from "./user";

export const rootReducer = {
	userSession,
	user: userReducer,
	userCandidateFeedback,
	[hiairBaseApi.reducerPath]: hiairBaseApi.reducer,
};
