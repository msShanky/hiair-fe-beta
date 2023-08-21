const joinMappingTablesToRequest = async (candidateRequest: CandidateRequestWithRelation) => {
	const keySkillMapping = await prisma.skill.findMany({
		where: {
			id: {
				in: candidateRequest?.keySkills.map((skillId) => parseInt(skillId)),
			},
		},
	});

	const optionalSkillMapping = await prisma.skill.findMany({
		where: {
			id: {
				in: candidateRequest?.optionalSkills.map((skillId) => parseInt(skillId)),
			},
		},
	});

	const locationMapping = await prisma.location.findMany({
		where: {
			id: {
				in: candidateRequest?.jobLocation.map((locationId) => parseInt(locationId)),
			},
		},
	});

	return { ...candidateRequest, keySkillMapping, optionalSkillMapping, locationMapping };
};

export const getCandidateRequestByID = async (requestId: string): Promise<any> => {
	const candidateRequest = await prisma.candidateRequest.findFirst({
		where: {
			refId: requestId,
		},
		include: {
			candidateTuning: true,
		},
	});

	if (!candidateRequest) return {};

	const finalResponse = joinMappingTablesToRequest(candidateRequest);

	return finalResponse;
};

export const getAllCandidateRequest = async (emailId: string): Promise<any> => {
	const candidateRequestList = await prisma.candidateRequest.findMany({
		where: {
			user: {
				email: emailId,
			},
		},
		include: {
			candidateTuning: true,
			companyInformation: true,
		},
	});

	if (!candidateRequestList) return {};

	const finalResponse = candidateRequestList.map((candidateRequest) => {
		return joinMappingTablesToRequest(candidateRequest);
	});

	return await Promise.all(finalResponse);
};
