import React, { FC } from "react";
import { Title, Text } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";

type TextDisplayProps = {
	label: string;
	value: any;
};

export const TextDisplay: FC<TextDisplayProps> = (props) => {
	const { label, value } = props;
	return (
		<div className="flex flex-col gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			<div className="flex flex-wrap gap-4">
				<Text className="text-base">
					{value != 0 && !value ? "NA" : typeof value === "string" ? upperFirst(value) : value}
				</Text>
			</div>
		</div>
	);
};
