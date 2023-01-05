// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { definitions } from "../../types/supabase";
import { dbConnect } from "lib";
import UserSession from "models/UserSession";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();

	if (req.method === "POST") {
		try {
			const userSession = await UserSession.create(req.body);
			res.status(200).json({ success: true, result_count: 1, data: userSession });
			// res.status(201).json({ success: true, result_count: userSession.length, data: userSession });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
