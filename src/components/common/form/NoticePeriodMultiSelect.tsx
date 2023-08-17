import React, { FC } from "react";
import { UseFormReturnType } from "@mantine/form";
import { MultiSelect } from "@mantine/core";
import  { staticNoticePeriod } from 'copy/static_options';

type NoticePeriodMultiSelectProps = {
	form: UseFormReturnType<any>;
	label: string;
	placeHolder: string;
	field: string;
};

export const NoticePeriodMultiSelect: FC<NoticePeriodMultiSelectProps> = (props) => {
	const { form, label, placeHolder, field } = props;

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
			data={staticNoticePeriod}
		/>
	);
};
