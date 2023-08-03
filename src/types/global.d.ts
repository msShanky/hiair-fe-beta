import { PrismaClient } from "@prisma/client";

type UserWithRelation = import("@prisma/client").User & {
	userProfile: Array<import("@prisma/client").UserProfile>;
};


declare global {
	var prisma: PrismaClient;
}
