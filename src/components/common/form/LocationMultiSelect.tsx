import React, { FC } from "react";
import { useGetCandidateLocationQuery } from "@/reducer/hiairBaseApi";
import { UseFormReturnType } from "@mantine/form";
import { MultiSelect } from "@mantine/core";

type LocationMultiSelectProps = {
	form: UseFormReturnType<any>;
};

export const LocationMultiSelect: FC<LocationMultiSelectProps> = (props) => {
	const { form } = props;
	const { data, isSuccess } = useGetCandidateLocationQuery();

	if (!data || !isSuccess) {
		return <MultiSelect disabled label="Job Location" placeholder="Please select skill set" data={[]} />;
	}

	return (
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
			data={data?.data}
		/>
	);
};
