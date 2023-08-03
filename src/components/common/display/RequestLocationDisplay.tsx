import React, { FC } from "react";
import { Title, Badge } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Location } from "@prisma/client";

type LocationDisplayProps = {
	label: string;
	value: Array<Location> | undefined;
};

export const RequestLocationDisplay: FC<LocationDisplayProps> = (props) => {
	const { label, value } = props;

	return (
		<div className="flex flex-col w-full col-span-4 gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			{value && (
				<div className="flex flex-wrap w-full gap-4 mt-4">
					{value.map((location) => {
						return (
							<Badge
								classNames={{
									root: "bg-secondaryYellow px-4",
									inner: "text-black",
								}}
								key={`${location.id}_${location.cityValue}`}
							>
								{`${location.city}, ${location.state}`}
							</Badge>
						);
					})}
				</div>
			)}
		</div>
	);
};
