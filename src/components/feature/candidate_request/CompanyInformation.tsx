import React from "react";
import { Textarea, Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { companyTypeStatic } from "copy";

import { CustomNumberInput, CustomTextInput } from "../../common/form";
// import { useGetCandidateLocationQuery, useGetCandidateSkillsQuery } from "@/reducer/hiairBaseApi";

type CompanyInformationFormProps = {
	handleFormSubmit: (values: CompanyInformationFormState) => void;
	initialFormValues: CompanyInformationFormState;
};

export const CompanyInformationForm = (props: CompanyInformationFormProps) => {
	const { handleFormSubmit, initialFormValues } = props;

	const form = useForm<CompanyInformationFormState>({
		initialValues: { ...initialFormValues },
		validateInputOnBlur: true,
		validate: {
			name: (value) => (value.length < 2 ? "Name should be greater than 2 character" : null),
			currentRole: (value) => (value.length < 2 ? "Current role should be greater than or equal to 2 character" : null),
			industry: (value) =>
				value && value.length < 2 ? "Industry should be greater than or equal to 2 character" : null,
			domain: (value) => (value && value.length < 2 ? "Domain should be greater than or equal to 2 character" : null),
			address: (value) => (value.length < 5 ? "Please enter a valid address" : null),
			contactInfo: (value) => (value && value.length != 10 ? "Please enter a valid 10 digit phone number" : null),
			companySize: (value) => (value <= 0 ? "Expected count should be greater than 0" : null),
			expectedHiringCount: (value) => (value <= 0 ? "Expected count should be greater than 0" : null),
		},
	});

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto mt-8 gap-y-6">
			<div className="grid grid-cols-2 gap-4">
				<CustomTextInput form={form} label="Company Name" field={"name"} placeholder="Hiair" />
				<CustomTextInput form={form} label="Current Role" field={"currentRole"} placeholder="Hiring Manger" />
				<CustomTextInput form={form} label="Company Address" field={"address"} placeholder="10, Dubai cross street" />
				<CustomTextInput form={form} label="Industry" field={"industry"} placeholder="Consulting" isOptional />
				<CustomTextInput form={form} label="Domain" field={"domain"} placeholder="IT" isOptional />
				<CustomTextInput form={form} label="Website" field={"website"} placeholder="www.hiair.in" isOptional />
				<CustomTextInput form={form} label="Phone" field={"contactInfo"} placeholder="82xxx45xxx" isOptional />
				<CustomNumberInput form={form} label="Company Size" field={"companySize"} placeholder="5" />
				<CustomNumberInput
					form={form}
					label="Expected Hiring Count Per Month"
					field={"expectedHiringCount"}
					placeholder="5"
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
				<div className="flex col-span-2 gap-4">
					<CustomTextInput
						form={form}
						label="Linkedin URL"
						field={"linkedinLink"}
						placeholder="www.linkedin.com"
						isOptional
					/>
					<CustomTextInput
						form={form}
						label="Twitter URL"
						field={"twitterLink"}
						placeholder="www.twitter.com"
						isOptional
					/>
					<CustomTextInput
						form={form}
						label="Facebook URL"
						field={"facebookURL"}
						placeholder="www.facebook.com"
						isOptional
					/>
				</div>
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
