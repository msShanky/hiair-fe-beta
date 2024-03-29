// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getDashboardJobPool } from "helpers/api/recruiterDashboard";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: "Invalid session, user un-authorised" });
	}

	if (req.method === "GET") {
		return res.status(200).json({
			jobPoolStats: await getDashboardJobPool(),
			userStats: {},
		});
	}
}
