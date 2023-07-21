// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { definitions } from "../../types/supabase";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			res.status(201).json({ success: true, result_count: 0, data: [] });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
