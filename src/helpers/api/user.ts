import axios from "axios";

export const getUser = async () => {
	const { data } = await axios.get("/api/user");
	return data;
};

export const setUserProfile = async (postBody: any) => {
	const { data } = await axios.post("/api/user/on-boarding", postBody);
	return data;
};
