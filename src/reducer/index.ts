import { hiairBaseApi } from "./hiairBaseApi";
import userSession from "./userSession";
import userCandidateFeedback from "./userCandidateFeedback";
import userReducer from "./user";


export const rootReducer = {
	[hiairBaseApi.reducerPath]: hiairBaseApi.reducer,
	userSession,
	user: userReducer,
	userCandidateFeedback,
};
