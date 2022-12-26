import React from "react";
import { Title, Text, TextInput, Select, MultiSelect, NumberInput, Button, RangeSlider, Input } from "@mantine/core";
import { staticDomain, staticExperience, staticNoticePeriod, staticSkills } from "copy";
import { useForm } from "@mantine/form";
import { useGetCandidateLocationQuery, useGetCandidateSkillsQuery } from "@/reducer/hiairBaseApi";

type CandidateRequestFormProps = {
	// showTuning: (value: boolean) => void;
	handleFormSubmit: (values: CandidateRequestForm) => void;
	initialFormValues: CandidateRequestForm;
};

export const CandidateRequestForm = (props: CandidateRequestFormProps) => {
	const { handleFormSubmit, initialFormValues } = props;
	const { data: candidateLocation, isSuccess: candidateLocationSuccess } = useGetCandidateLocationQuery();
	const { data: candidateSkills, isSuccess: candidateSkillSuccess } = useGetCandidateSkillsQuery();

	const form = useForm<CandidateRequestForm>({
		initialValues: initialFormValues,
		// initialValues: {
		// 	domain: "",
		// 	experience: "",
		// 	skill_set: [],
		// 	industry: "",
		// 	job_location: [],
		// 	notice_period: [],
		// 	required_profile: 0,
		// 	role: "",
		// 	turn_around_time: 0,
		// 	salary_range: [3, 12],
		// },
		validateInputOnBlur: true,
		validate: {
			role: (value: string) => {
				if (!value) {
					return "Please enter a valid role";
				}
				if (value.length < 5) {
					return "Role name must be at least 5 characters";
				}
				return null;
			},
		},
	});

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto mt-20 gap-y-6">
			<Title className="mb-10 text-2xl text-primaryAlt" order={1}>
				Candidate Request Creation
			</Title>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col">
					<Title className="text-xl text-secondaryBlue" order={1}>
						Hiring Info
					</Title>
					<Text className="text-base dark:text-white text-black">Provide your hiring parameters</Text>
				</div>
				<div className="flex flex-col gap-4">
					<TextInput
						classNames={{
							label: "dark:text-white text-black",
						}}
						{...form.getInputProps("role")}
						className="w-full "
						label="Role"
						withAsterisk
						placeholder="Software Developer"
					/>
					<Select
						label="Domain"
						placeholder="please select a domain"
						{...form.getInputProps("domain")}
						classNames={{
							label: "dark:text-white text-black",
						}}
						data={staticDomain}
					/>
					<Select
						label="Industry"
						placeholder="Please select an industry"
						classNames={{
							label: "dark:text-white text-black",
						}}
						{...form.getInputProps("industry")}
						data={staticDomain}
					/>
					<Select
						label="Experience"
						placeholder="Please select experience"
						classNames={{
							label: "dark:text-white text-black",
						}}
						withAsterisk
						{...form.getInputProps("experience")}
						data={staticExperience}
					/>
					<MultiSelect
						label="Job Location"
						placeholder="Please select preferred location"
						classNames={{
							label: "dark:text-white text-black",
						}}
						withAsterisk
						searchable
						nothingFound="Nothing found"
						{...form.getInputProps("job_location")}
						data={candidateLocationSuccess ? candidateLocation.data : []}
					/>
					<MultiSelect
						label="Skill Set"
						placeholder="Please select skill set"
						classNames={{
							label: "dark:text-white text-black",
						}}
						searchable
						limit={50}
						nothingFound="Nothing found"
						withAsterisk
						{...form.getInputProps("skill_set")}
						data={candidateSkillSuccess ? candidateSkills.data : []}
					/>
					<MultiSelect
						label="Notice Period"
						placeholder="Please select notice period"
						classNames={{
							label: "dark:text-white text-black",
						}}
						{...form.getInputProps("notice_period")}
						data={staticNoticePeriod}
					/>
					<Input.Wrapper
						classNames={{
							label: "dark:text-white text-black",
						}}
						label="Salary Range"
					>
						{form.values.salary_range && (
							<div className="flex gap-6 mt-4 items-center">
								<Text className="dark:text-white text-black"> Min: {form.values.salary_range[0]} Lacks</Text>
								<Text className="dark:text-white text-black"> Max: {form.values.salary_range[1]} Lacks</Text>
							</div>
						)}
						<RangeSlider
							min={1}
							max={80}
							{...form.getInputProps("salary_range")}
							label={(value) => `${value} Lacks`}
							className="mt-8"
						/>
					</Input.Wrapper>
					<NumberInput
						withAsterisk
						classNames={{
							label: "dark:text-white text-black",
						}}
						label="HiAiR Turn Around Time (Days)"
						className="w-full"
						placeholder="10"
						{...form.getInputProps("turn_around_time")}
					/>
					<NumberInput
						classNames={{
							label: "dark:text-white text-black",
						}}
						withAsterisk
						{...form.getInputProps("required_profile")}
						label="No.of Profiles Required"
						className="w-full"
						placeholder="10"
					/>
				</div>
			</div>
			<div className="flex self-end gap-10 mt-24">
				<Button
					disabled={!form.isValid()}
					type="submit"
					className="w-32 text-white bg-primary hover:bg-primary hover:bg-opacity-30"
				>
					Next
				</Button>
			</div>
		</form>
	);
};
