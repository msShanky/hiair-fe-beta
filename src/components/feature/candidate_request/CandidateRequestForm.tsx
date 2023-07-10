import React from "react";
import { Group, Text, TextInput, Select, MultiSelect, NumberInput, Button, RangeSlider, Input } from "@mantine/core";
import { staticDomain, staticExperience, staticLocation, staticNoticePeriod, staticSkills, workModeStatic } from "copy";
import { useForm } from "@mantine/form";
// import { useGetCandidateLocationQuery, useGetCandidateSkillsQuery } from "@/reducer/hiairBaseApi";

type CandidateRequestFormProps = {
	handleFormSubmit: (values: CandidateRequest) => void;
	initialFormValues: CandidateRequest;
	prevStep: () => void;
};

export const CandidateRequestForm = (props: CandidateRequestFormProps) => {
	const { handleFormSubmit, initialFormValues, prevStep } = props;
	// const { data: candidateLocation, isSuccess: candidateLocationSuccess } = useGetCandidateLocationQuery();
	// const { data: candidateSkills, isSuccess: candidateSkillSuccess } = useGetCandidateSkillsQuery();

	console.log("initialFormValues ==> ", initialFormValues);

	const form = useForm<CandidateRequest>({
		initialValues: { ...initialFormValues },
		validateInputOnBlur: true,
	});

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto mt-20 gap-y-6">
			<div className="grid grid-cols-2 gap-4">
				<TextInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("jobTitle")}
					className="w-full "
					label="Job Title"
					withAsterisk
					placeholder="Software Developer"
				/>
				<MultiSelect
					label="Job Location"
					placeholder="Please select skill set"
					classNames={{
						label: "dark:text-white text-black",
					}}
					searchable
					limit={50}
					nothingFound="Nothing found"
					withAsterisk
					{...form.getInputProps("jobLocation")}
					data={staticLocation}
				/>
				<Input.Wrapper
					classNames={{
						label: "dark:text-white text-black",
					}}
					label="Experience"
					withAsterisk
				>
					{form.values.experience && (
						<div className="flex items-center gap-6 mt-4">
							<Text className="text-black dark:text-white"> Min: {form.values.experience[0]} yrs</Text>
							<Text className="text-black dark:text-white"> Max: {form.values.experience[1]} yrs</Text>
						</div>
					)}
					<RangeSlider
						step={1}
						min={0}
						max={30}
						minRange={2}
						{...form.getInputProps("experience")}
						label={(value) => `${value} Yrs`}
						className="mt-8"
					/>
				</Input.Wrapper>
				<Input.Wrapper
					classNames={{
						label: "dark:text-white text-black",
					}}
					label="Salary Range"
					withAsterisk
				>
					{form.values.experience && (
						<div className="flex items-center gap-6 mt-4">
							<Text className="text-black dark:text-white"> Min: {form.values.salaryRange[0]} lacks</Text>
							<Text className="text-black dark:text-white"> Max: {form.values.salaryRange[1]} lacks</Text>
						</div>
					)}
					<RangeSlider
						min={1}
						max={80}
						minRange={3}
						{...form.getInputProps("salaryRange")}
						label={(value) => `${value}`}
						className="mt-8"
					/>
				</Input.Wrapper>
				<NumberInput
					withAsterisk
					classNames={{
						label: "dark:text-white text-black",
					}}
					label="Available Position"
					className="w-full"
					placeholder="10"
					{...form.getInputProps("availablePosition")}
				/>
				<MultiSelect
					label="Key Skills"
					placeholder="Please select key skills for the job"
					classNames={{
						label: "dark:text-white text-black",
					}}
					searchable
					limit={10}
					nothingFound="Nothing found"
					withAsterisk
					{...form.getInputProps("keySkills")}
					data={staticSkills}
				/>
				<MultiSelect
					label="Optional Skills"
					placeholder="Please select optional skills which are value added for this job"
					classNames={{
						label: "dark:text-white text-black",
					}}
					searchable
					limit={10}
					nothingFound="Nothing found"
					{...form.getInputProps("optionalSkills")}
					data={staticSkills}
				/>
				<MultiSelect
					label="Expected Joining Date"
					placeholder="Please select the acceptable notice periods of candidates"
					classNames={{
						label: "dark:text-white text-black",
					}}
					searchable
					nothingFound="Nothing found"
					{...form.getInputProps("expectedJoiningDate")}
					data={staticNoticePeriod}
				/>
				<TextInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("educationQualification")}
					className="w-full"
					label="Education Qualification"
					withAsterisk
					placeholder="Any Degree"
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
				<Button variant="default" type="button" className="text-white hover:text-black" onClick={prevStep}>
					Back
				</Button>
				<Button
					type="submit"
					disabled={!form.isValid()}
					className={
						"text-black hover:text-secondaryYellow dark:hover:bg-primaryAlt active:text-secondaryYellow dark:text-white dark:hover:text-black bg-none hover:bg-black dark:bg-primary disabled:bg-slate-300 dark:disabled:bg-slate-300 dark:disabled:text-black disabled:hover:cursor-not-allowed hover:cursor-pointer"
					}
				>
					Next step
				</Button>
			</Group>
		</form>
	);
};
