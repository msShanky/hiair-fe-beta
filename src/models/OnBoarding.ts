import mongoose from "mongoose";

const OnBoardingSchema = new mongoose.Schema({
	sessionId: String,
	firstName: String,
	lastName: String,
	organization: String,
	role: String,
	expected_hiring_count: Number,
});

export default mongoose.models.OnBoardingSchema || mongoose.model("OnBoardingSchema", OnBoardingSchema);
