import React from "react";
import { Textarea, Button, Group, TextInput, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { companyTypeStatic } from "copy";

// import { useGetCandidateLocationQuery, useGetCandidateSkillsQuery } from "@/reducer/hiairBaseApi";

type CompanyInformationFormProps = {
	handleFormSubmit: (values: CompanyInformation) => void;
	initialFormValues: CompanyInformation;
};

export const CompanyInformationForm = (props: CompanyInformationFormProps) => {
	const { handleFormSubmit, initialFormValues } = props;

	const form = useForm<CompanyInformation>({
		initialValues: { ...initialFormValues },
		validateInputOnBlur: true,
		validate: {
			name: (value) => (value.length < 2 ? "Name should be greater than 2 character" : null),
			currentRole: (value) => (value.length < 2 ? "Current role should be greater than 2 character" : null),
			industry: (value) => (value.length < 2 ? "Industry should be greater than 2 character" : null),
			expectedHiringCount: (value) => (value < 0 ? "Expected count should be greater than 0" : null),
		},
	});

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto mt-20 gap-y-6">
			<div className="grid grid-cols-2 gap-4">
				<TextInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("name")}
					className="w-full "
					label="Company Name"
					withAsterisk
					placeholder="HiAir"
				/>
				<TextInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("currentRole")}
					className="w-full "
					label="Your Role in Company"
					withAsterisk
					placeholder="Hiring Manger"
				/>
				<TextInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("industry")}
					className="w-full "
					label="Industry of company"
					withAsterisk
					placeholder="Consulting"
				/>
				<NumberInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("companySize")}
					className="w-full "
					label="Company Size"
					withAsterisk
					placeholder="5"
				/>
				<NumberInput
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("expectedHiringCount")}
					className="w-full "
					label="Expected Hiring Count Per Month"
					withAsterisk
					placeholder="0"
				/>
				<Select
					label="Company Type"
					placeholder="Please select company type"
					classNames={{
						label: "dark:text-white text-black",
					}}
					{...form.getInputProps("companyType")}
					data={companyTypeStatic}
				/>
				<Textarea
					classNames={{
						label: "dark:text-white text-black",
						root: "col-span-2 min-h-[4rem]",
					}}
					{...form.getInputProps("about")}
					className="w-full"
					label="About Company"
					placeholder="A short writeup about your company so that it's easy for candidates to get some clarity"
				/>
			</div>
			<Group position="center" mt="xl">
				{/* <Button variant="default" onClick={prevStep}>
					Back
				</Button> */}
				<Button
					type="submit"
					// onClick={nextStep}
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
