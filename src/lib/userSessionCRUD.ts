import { CompanyInformation as PrismaCompanyInformation } from "@prisma/client";
import prisma from "./prisma";
import { nanoid } from "@reduxjs/toolkit";
import { use } from "react";

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
	const { companyInfo } = postBody;

	const existingCompanyInfo = await prisma.companyInformation.findFirst({
		where: {
			name: companyInfo.name,
		},
	});

	if (existingCompanyInfo) {
		const candidateRequest = await createCandidateRequest(existingCompanyInfo.id, user.id, postBody);
		return { companyInformation: existingCompanyInfo, candidateRequest };
	}

	if (!existingCompanyInfo && user) {
		try {
			const createdCompany = await createCompanyInformation(companyInfo, user.id);
			await prisma.userCompanyMapping.create({
				data: {
					companyId: createdCompany.id,
					userId: user.id,
					createdBy: user.id,
					updatedBy: user.id,
					currentRole: postBody.companyInfo.currentRole,
				},
			});
			const candidateRequest = await createCandidateRequest(createdCompany.id, user.id, postBody);
			return { companyInformation: createdCompany, candidateRequest };
		} catch (error) {
			throw error;
		}
	}
};
