// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { definitions } from "../../types/supabase";
import { dbConnect } from "lib";
import HiairCandidate from "models/Candidates";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();

	if (req.method === "GET") {
		try {
			const candidatesList = await HiairCandidate.find({});
			res.status(200).json({ success: true, data: candidatesList });
		} catch (err) {
			res.status(400).json({ success: false, data: JSON.stringify(err) });
		}
	}

	if (req.method === "POST") {
		try {
			const body: CandidateRequestCreationPostBody = req.body;
			const experienceRange = body.experience?.split("-");
			const andConditions = [];

			if (experienceRange) {
				const [min, max] = experienceRange;
				andConditions.push({ total_experience: { $lt: max } });
				andConditions.push({ total_experience: { $gt: min } });
			}

			if (body.salary_range) {
				const [min, max] = body.salary_range;
				andConditions.push({ current_ctc: { $lt: max } });
				andConditions.push({ current_ctc: { $gt: min } });
			}

			const filteredCandidates = await HiairCandidate.find({
				$and: andConditions,
				$or: [
					{ skills: { $in: body.skill_set } },
					{ city: { $in: body.job_location } },
					{ notice_period: { $in: body.notice_period } },
				],
			});
			res.status(200).json({ success: true, result_count: filteredCandidates.length, data: filteredCandidates });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
