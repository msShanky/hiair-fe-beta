import prisma from "@/lib/prisma";
import {
	filterConstruct,
	getCandidateExperienceScore,
	getCandidateSkillScore,
	getCandidateLocationScore,
	getCandidateNoticeScore,
	getCandidateSalaryScore,
} from ".";
// import { CandidateSkillMapping, Prisma } from "@prisma/client";

export const getMatchingCandidates = async (requestId: string) => {
	const request = await prisma.candidateRequest.findFirstOrThrow({
		where: {
			refId: requestId,
		},
		include: {
			candidateTuning: true,
		},
	});

	if (!request.candidateTuning) throw new Error("Candidate tuning is not available");

	const candidateFilter = filterConstruct(request);

	// console.log("Constructed filter", JSON.stringify(candidateFilter));

	const selectedCandidates = await prisma.candidate.findMany({
		take: 15,
		where: candidateFilter,
		include: {
			desiredLocations: {
				include: {
					location: true,
				},
			},
			jobPool: true,
			location: true,
			skills: {
				include: {
					skill: true,
				},
			},
		},
	});

	// TODO: Calculate score for each of the weights and display on the UI
	// TODO: Skill score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: Experience score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: NoticePeriod score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: Salary score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: Location score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%

	const candidateWithScore = selectedCandidates.map(async (candidate) => {
		// console.log("candidate selected for computing scores => ", candidate);
		const { minExperience, maxExperience, expectedJoiningDate, keySkills, jobLocation, minSalary, maxSalary } = request;

		const candidateScore = {
			skillScore: getCandidateSkillScore(candidate.skills, keySkills),
			experienceScore: getCandidateExperienceScore(candidate.totalExperience, [minExperience, maxExperience]),
			locationScore: await getCandidateLocationScore(candidate.location, candidate.desiredLocations, jobLocation),
			noticePeriodScore: getCandidateNoticeScore(candidate.noticePeriod, expectedJoiningDate),
			salaryScore: getCandidateSalaryScore(candidate.currentSalary, candidate.expectedSalary, minSalary, maxSalary),
		};

		return { ...candidate, scores: candidateScore };
	});

	return await Promise.all(candidateWithScore);
};
