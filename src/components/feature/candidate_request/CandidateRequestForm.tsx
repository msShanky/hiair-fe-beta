import React from "react";
import { Group, Text, TextInput, Select, NumberInput, Button, RangeSlider, Input } from "@mantine/core";
import { workModeStatic } from "copy";
import { useForm } from "@mantine/form";
import { CustomNumberInput, CustomTextInput, LocationMultiSelect } from "@/components/common/form";
import { TechSkillsMultiSelect } from "@/components/common/form/TechSkillsMultiSelect";
import { CustomRangeSlider } from "@/components/common/form/CustomRangeSlider";

type CandidateRequestFormProps = {
	handleFormSubmit: (values: CandidateRequest) => void;
	initialFormValues: CandidateRequest;
	prevStep: () => void;
};

export const CandidateRequestForm = (props: CandidateRequestFormProps) => {
	const { handleFormSubmit, initialFormValues, prevStep } = props;
	const form = useForm<CandidateRequest>({ initialValues: { ...initialFormValues }, validateInputOnBlur: true });

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto mt-20 gap-y-6">
			<div className="grid grid-cols-2 gap-4">
				<CustomTextInput form={form} label="Job Title" placeholder="Software Developer" field="jobTitle" />
				<LocationMultiSelect form={form} />
				<CustomRangeSlider form={form} label="Experience" field="experience" />
				<CustomRangeSlider form={form} label="Salary Range" field="salaryRange" />
				<CustomNumberInput form={form} label="Available Position" field="availablePosition" placeholder="10" />
				<TechSkillsMultiSelect
					form={form}
					isTech
					label="Key Skills"
					field="keySkills"
					placeHolder="Please select key skills for the job"
				/>
				<TechSkillsMultiSelect
					form={form}
					isTech={false}
					label="Optional Skills"
					field="optionalSkills"
					placeHolder="Please select optional skills which are value added for this job"
				/>
				<CustomTextInput
					form={form}
					label="Education Qualification"
					placeholder="Any Degree"
					field="educationQualification"
				/>
				<Select
					label="Mode of work"
					placeholder="Please select company type"
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("modeOfWork")}
					data={workModeStatic}
				/>
			</div>
			{/* </div> */}
			<Group position="center" mt="xl">
				<Button variant="default" type="button" className="text-white hover:text-black bg-primaryAlt" onClick={prevStep}>
					Back
				</Button>
				<Button
					type="submit"
					disabled={!form.isValid()}
					className={
						"text-black bg-secondaryYellow hover:text-secondaryYellow dark:hover:bg-primaryAlt active:text-secondaryYellow dark:text-white dark:hover:text-black bg-none hover:bg-black dark:bg-primary disabled:bg-slate-300 dark:disabled:bg-slate-300 dark:disabled:text-black disabled:hover:cursor-not-allowed hover:cursor-pointer"
					}
				>
					Next step
				</Button>
			</Group>
		</form>
	);
};
