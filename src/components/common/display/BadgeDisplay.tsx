import React, { FC } from "react";
import { Title, Text, Badge } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";

type BadgeDisplayProps = {
	label: string;
	value: any;
};

export const BadgeDisplay: FC<BadgeDisplayProps> = (props) => {
	const { label, value } = props;
	return (
		<div className="flex flex-col gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			<Badge color="grape">{value}</Badge>
			{/* <div className="flex flex-wrap gap-4">
				<Text className="text-base">{!value ? "NA" : typeof value ==='string' ? upperFirst(value): value}</Text>
			</div> */}
		</div>
	);
};
