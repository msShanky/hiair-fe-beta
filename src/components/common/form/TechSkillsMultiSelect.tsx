import React, { FC } from "react";
import { useGetCandidateLocationQuery, useGetCandidateSkillsQuery } from "@/reducer/hiairBaseApi";
import { UseFormReturnType } from "@mantine/form";
import { MultiSelect } from "@mantine/core";

type TechSkillsMultiSelectProps = {
	form: UseFormReturnType<any>;
	isTech: boolean;
	label: string;
	placeHolder: string;
	field: string;
};

export const TechSkillsMultiSelect: FC<TechSkillsMultiSelectProps> = (props) => {
	const { form, isTech, label, placeHolder, field } = props;
	const { data, isSuccess } = useGetCandidateSkillsQuery(isTech);

	if (!data || !isSuccess) {
		return <MultiSelect disabled label={label} placeholder={placeHolder} data={[]} />;
	}

	return (
		<MultiSelect
			label={label}
			placeholder={placeHolder}
			classNames={{
				label: "dark:text-white text-black",
			}}
			searchable
			limit={50}
			nothingFound="Nothing found"
			withAsterisk
			{...form.getInputProps(field)}
			data={data?.data}
		/>
	);
};
