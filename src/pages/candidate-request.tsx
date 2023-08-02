import { useState } from "react";
import type { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import {
	CompanyInformationForm,
	CandidateTuning,
	CandidateRequestForm,
	PreviewJD,
	CompanyHandler,
} from "@/components/feature/candidate_request";
import { updateCandidateRequest, updateCandidateTuning, updateCompanyInfo } from "@/reducer/userSession";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useRouter } from "next/router";
import { Stepper } from "@mantine/core";
import { useStoreUserSessionMutation } from "@/reducer/hiairBaseApi";

const CandidateRequestPage: NextPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const userSession = useAppSelector((state) => state.userSession);
	const [active, setActive] = useState(0);
	const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const [postUserSession, userSessionResponse] = useStoreUserSessionMutation({
		fixedCacheKey: "user-session",
		selectFromResult: (values) => values,
	});

	const handleCandidateRequestCreation = (values: CandidateRequest) => {
		// TODO: IF the session id is null then create a new session id
		dispatch(updateCandidateRequest(values));
		nextStep();
	};

	// const handleCompanyInformation = (values: CompanyInformationFormState) => {
	// 	dispatch(updateCompanyInfo(values));
	// 	nextStep();
	// };

	const handleCandidateTuning = async (values: CandidateTuningForm) => {
		// TODO: IF the session id is null then create a new session id
		dispatch(updateCandidateTuning(values));
		try {
			const sessionResponse = await postUserSession({ ...userSession, candidateSelectionTuning: values });
			if (sessionResponse) {
				// @ts-ignore
				const { candidateRequest } = sessionResponse.data;
				router.push(`/candidate-recommendation?requestId=${candidateRequest.refId}`);
			}
		} catch (error) {}
	};

	// Step 1 Display on boarding steps
	// Step 2 Collect company information
	// Step 3 Collect job description
	// Step 4 Preview JD
	// Step 5 Collect weights for recommendations
	// Step 6 Navigate to recommendations

	return (
		<AppLayout title="HiAir | Candidate Request">
			<section>
				<Stepper
					active={active}
					onStepClick={(index) => setActive(index)}
					breakpoint="sm"
					className="justify-center w-10/12 mx-auto"
					classNames={{
						stepLabel: "text-primaryAlt active:text-white",
					}}
				>
					<Stepper.Step label="Company" description="About the company" className="text-white active:text-primaryAlt">
						<CompanyHandler nextStep={nextStep} />
					</Stepper.Step>
					<Stepper.Step label="Job Description" description="About the job posting">
						<CandidateRequestForm
							initialFormValues={userSession.candidateRequest}
							handleFormSubmit={handleCandidateRequestCreation}
							prevStep={prevStep}
						/>
					</Stepper.Step>
					<Stepper.Step label="Preview JD" description="View the JD for validation">
						<PreviewJD prevStep={prevStep} nextStep={nextStep} />
					</Stepper.Step>
					<Stepper.Step label="Recommendation Tuning" description="Tune the config on the priority for each field">
						<CandidateTuning
							handleFormSubmit={handleCandidateTuning}
							initialFormValues={userSession.candidateSelectionTuning}
							prevStep={prevStep}
						/>
					</Stepper.Step>
					<Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
				</Stepper>
			</section>
		</AppLayout>
	);
};

export default CandidateRequestPage;
