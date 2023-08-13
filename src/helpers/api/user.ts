import { User } from "@prisma/client";
import axios, { AxiosResponse } from "axios";

export const getUser = async () => {
	const { data } = await axios.get<void, AxiosResponse<UserWithRelation>>("/api/user");
	return data;
};

export const setUserProfile = async (postBody: any) => {
	const { data } = await axios.post("/api/user/on-boarding", postBody);
	return data;
};
