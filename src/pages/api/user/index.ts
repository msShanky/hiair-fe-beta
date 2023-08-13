// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: "Invalid session, user un-authorised" });
	}

	if (req.method === "GET") {
		try {
			const response = await prisma.user.findFirstOrThrow({
				where: {
					email: session.user?.email,
				},
				include: {
					userProfile: true,
				},
			});
			res.status(200).json({ ...response });
			// res.status(201).json({ success: true, result_count: userSession.length, data: userSession });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
