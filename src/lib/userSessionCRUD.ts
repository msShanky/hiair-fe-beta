import { CompanyInformation as PrismaCompanyInformation } from "@prisma/client";
import prisma from "./prisma";
import { nanoid } from "@reduxjs/toolkit";

const createCandidateRequest = async (companyId: number, userId: string, postBody: UserSessionStateType) => {
	const { candidateRequest, candidateSelectionTuning } = postBody;

	const { experience: experienceWeight, location, notice_period, salary, skills } = candidateSelectionTuning;

	const {
		jobTitle,
		jobLocation,
		availablePosition,
		educationQualification,
		expectedJoiningDate,
		experience,
		keySkills,
		salaryRange,
		modeOfWork,
		optionalSkills,
		rawJD,
	} = candidateRequest;

	return prisma.candidateRequest.create({
		data: {
			description: rawJD ?? "",
			refId: nanoid(6),
			jobTitle,
			status: "new",
			minSalary: salaryRange[0],
			maxSalary: salaryRange[1],
			minExperience: experience[0],
			maxExperience: experience[1],
			shortDescription: "",
			companyId,
			userId,
			education: educationQualification,
			availablePosition,
			keySkills,
			expectedJoiningDate,
			optionalSkills,
			employmentType: "",
			functionalArea: "",
			industry: "",
			jobLocation,
			jobType: "",
			modeOfWork,
			roleCategory: "",
			candidateTuning: {
				create: {
					experienceWeight,
					locationWeight: location,
					noticePeriodWeight: notice_period,
					salaryWeight: salary,
					skillWeight: skills,
				},
			},
		},
	});
};

/**
 * Manages to create a new company for the provided information
 * @returns Company Information created for the given postBody
 */
const createCompanyInformation = async (
	companyInfo: CompanyInformationFormState,
	userId: string
): Promise<PrismaCompanyInformation> => {
	const { currentRole, ...companyDBCreateBody } = companyInfo;
	return prisma.companyInformation.create({
		data: {
			...companyDBCreateBody,
			createdBy: userId,
			updatedBy: userId,
		},
	});
};

/**
 * Creates and stores the data collected from the form for creating a new candidate request created from recruiter flow
 * @param postBody UserSessionStateType
 * @param user
 * @returns
 */
export const storeCandidateRequest = async (postBody: UserSessionStateType, user: UserWithRelation) => {
	const { companyInfo, companyId } = postBody;

	let companyRefId = companyId;

	console.log("The company id received for selection [1] ===> ", companyRefId);

	// If the post body does not have company ID check if the name matches to get the exiting company list to avoid duplicates
	if (!companyRefId) {
		console.log(" ---- Finding existing company ---- ");
		const existingCompanyInfo = await prisma.companyInformation.findFirst({
			where: {
				name: companyInfo.name,
			},
		});

		if (existingCompanyInfo) {
			companyRefId = existingCompanyInfo?.id;
		}
	}

	const isExistingCompanyMapping = await prisma.userCompanyMapping.count({
		where: {
			companyId: companyId,
		},
	});

	console.log("isExistingCompanyMapping ===> ", isExistingCompanyMapping);

	// if (existingCompanyInfo) {
	// const candidateRequest = await createCandidateRequest(existingCompanyInfo.id, user.id, postBody);
	// return { companyInformation: existingCompanyInfo, candidateRequest };
	// }

	console.log("The company id received for selection [2] ===> ", companyRefId);
	if (!companyRefId && user) {
		console.log(" ---- Creating a new company **** ");
		const createdCompany = await createCompanyInformation(companyInfo, user.id);

		companyRefId = createdCompany.id;
	}

	if (isExistingCompanyMapping <= 0 && companyRefId) {
		await prisma.userCompanyMapping.create({
			data: {
				companyId: companyRefId,
				userId: user.id,
				createdBy: user.id,
				updatedBy: user.id,
				currentRole: postBody.companyInfo.currentRole,
			},
		});
	}

	if (companyRefId) {
		try {
			const candidateRequest = await createCandidateRequest(companyRefId, user.id, postBody);
			return { companyID: companyRefId, candidateRequest };
		} catch (error) {
			throw error;
		}
	}
};
