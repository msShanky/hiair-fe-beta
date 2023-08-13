// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: "Invalid session, user un-authorised" });
	}

	if (req.method === "GET") {
		const dbUser = await prisma.user.findFirst({
			where: {
				email: session.user?.email,
			},
			include: {
				userProfile: true,
			},
		});

		if (!dbUser) {
			return res.status(404).json({
				message: "The user could not be found",
			});
		}

		const dbCompanies = await prisma.userCompanyMapping.findMany({
			where: {
				userId: dbUser?.id,
			},
			include: {
				company: true,
			},
		});

		return res.status(200).json({
			companies: dbCompanies,
		});
	}
}
