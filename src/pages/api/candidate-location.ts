// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { definitions } from "../../types/supabase";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const locationList = await prisma.location.findMany();
			const formattedLocationList = locationList.map((dbLocation) => {
				return {
					value: dbLocation.id.toString(),
					label: `${dbLocation.city}, ${dbLocation.state}`,
				};
			});
			res.status(200).json({ success: true, result_count: locationList.length, data: formattedLocationList });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
