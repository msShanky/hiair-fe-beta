import { hiairBaseApi } from "./hiairBaseApi";
import userSession from "./userSession";
import userReducer from "./user";

export const rootReducer = {
	userSession,
	user: userReducer,
	[hiairBaseApi.reducerPath]: hiairBaseApi.reducer,
};
