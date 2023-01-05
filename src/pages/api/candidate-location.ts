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
			const filteredCandidates = await HiairCandidate.distinct("city", { city: { $ne: null } });
			res.status(200).json({ success: true, result_count: filteredCandidates.length, data: filteredCandidates });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
