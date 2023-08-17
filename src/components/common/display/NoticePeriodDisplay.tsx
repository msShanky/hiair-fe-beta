import { Badge, Title } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import React, { FC } from "react";

type NoticePeriodDisplayProps = {
	label: string;
	value: Array<string> | undefined;
};

export const NoticePeriodDisplay: FC<NoticePeriodDisplayProps> = (props) => {
	const { label, value } = props;

	const formatValueForRender = (value: string) => {
		switch (value) {
			case "0":
				return "Immediate";
			case "1":
				return "1 Month";
			case "2":
				return "2 Month";
			case "3":
				return "3 Month";
			case "4":
				return "4 Month";

			default:
				break;
		}
	};

	return (
		<div className="flex flex-col w-full col-span-4 gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			{value && (
				<div className="flex flex-wrap w-full gap-4 mt-4">
					{value.map((noticeItem) => {
						return (
							<Badge
								classNames={{
									root: "bg-secondaryYellow px-4",
									inner: "text-black",
								}}
								key={`${noticeItem}`}
							>
								{formatValueForRender(noticeItem)}
							</Badge>
						);
					})}
				</div>
			)}
		</div>
	);
};
