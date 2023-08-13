import React, { FC } from "react";
import { Title, Badge } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";

type SkillDisplayProps = {
	label: string;
	value: Array<SkillMapping> | undefined;
};

export const SkillDisplay: FC<SkillDisplayProps> = (props) => {
	const { label, value } = props;

	console.log("Skills ==> ", value);
	return (
		<div className="flex flex-col w-full col-span-4 gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			{value && (
				<div className="flex flex-wrap w-full gap-4 mt-4">
					{value.map((skillMapping) => {
						return (
							<Badge
								classNames={{
									root: "bg-secondaryYellow px-4",
									inner: "text-black",
								}}
								key={`${skillMapping.skillId}_${skillMapping.candidateId}`}
							>
								{skillMapping.skill.label}
							</Badge>
						);
					})}
				</div>
			)}
		</div>
	);
};
