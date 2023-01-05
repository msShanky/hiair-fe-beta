// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { definitions } from "../../types/supabase";
import { dbConnect } from "lib";
import UserFeedback from "models/UserFeedback";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();

	if (req.method === "POST") {
		try {
			const userFeedback = await UserFeedback.create(req.body);
			res.status(201).json({ success: true, result_count: 1, data: userFeedback });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
