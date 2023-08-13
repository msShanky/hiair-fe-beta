import React, { FC } from "react";
import { UseFormReturnType } from "@mantine/form";
import { NumberInput } from "@mantine/core";

type CustomNumberInputProps = {
	form: UseFormReturnType<any>;
	label: string;
	placeholder: string;
	field: string;
	isOptional?: boolean;
};

export const CustomNumberInput: FC<CustomNumberInputProps> = (props) => {
	const { form, label, placeholder, field, isOptional } = props;
	return (
		<NumberInput
			classNames={{
				label: "dark:text-white text-black",
			}}
			{...form.getInputProps(field)}
			className="w-full "
			label={label}
			withAsterisk={!isOptional}
			placeholder={placeholder}
		/>
	);
};
