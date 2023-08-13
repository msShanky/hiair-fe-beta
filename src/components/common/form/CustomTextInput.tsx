import React, { FC } from "react";
import { UseFormReturnType } from "@mantine/form";
import { TextInput } from "@mantine/core";

type CustomTextInputProps = {
	form: UseFormReturnType<any>;
	label: string;
	placeholder: string;
	field: string;
	isOptional?: boolean;
};

export const CustomTextInput: FC<CustomTextInputProps> = (props) => {
	const { form, label, placeholder, field, isOptional = false } = props;
	return (
		<TextInput
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
