type UserWithRelation = import("@prisma/client").User & {
	userProfile: Array<import("@prisma/client").UserProfile>;
};
