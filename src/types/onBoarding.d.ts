type Gender = "male" | "female" | "other";

type OnBoardingForm = {
	gender?: Gender;
	firstName: string;
	lastName?: string;
	organization?: string;
	role: string;
	expected_hiring_count?: number;
};
