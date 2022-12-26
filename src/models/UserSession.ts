import { model, models, Schema } from "mongoose";

const MODEL_NAME = "user_session";

const UserSessionSchema = new Schema({
	session_id: String,
	user_id: String,
	onBoardingInfo: {
		gender: String,
		first_name: String,
		last_name: String,
		organization: String,
		role: String,
		expected_hiring_count: Number,
	},
	candidateRequest: {
		role: String,
		domain: String,
		industry: String,
		experience: String,
		job_location: Array<String>,
		skill_set: Array<String>,
		notice_period: Array<Number>,
		salary_range: Array<Number>,
		turn_around_time: Number,
		required_profile: Number,
	},
	candidateSelectionTuning: {
		skills: Number,
		experience: Number,
		salary: Number,
		location: Number,
		industry: Number,
		domain: Number,
		notice_period: Number,
	},
});

// export default mongoose.models.HiairCandidate || mongoose.model("hiair_candidate", HiairCandidate);

const HiairCandidateModel = models[MODEL_NAME] || model(MODEL_NAME, UserSessionSchema);
export default HiairCandidateModel;
