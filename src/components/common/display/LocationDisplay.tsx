import React, { FC } from "react";
import { Title, Badge } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";

type LocationDisplayProps = {
	label: string;
	value: Array<DesiredLocationMapping> | undefined;
	requestedLocations?: Array<string>;
};

export const LocationDisplay: FC<LocationDisplayProps> = (props) => {
	const { label, value, requestedLocations } = props;

	return (
		<div className="flex flex-col w-full col-span-4 gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			{value && (
				<div className="flex flex-wrap w-full gap-4 mt-4">
					{value.map((locationMapping) => {
						const isMatch = requestedLocations?.includes(locationMapping.locationId.toString());
						return (
							<Badge
								classNames={{
									root: `${isMatch ? "bg-success" : "bg-secondaryYellow"} px-4`,
									inner: "text-black",
								}}
								key={`${locationMapping.locationId}_${locationMapping.candidateId}`}
							>
								{`${locationMapping.location.city}, ${locationMapping.location.state}`}
							</Badge>
						);
					})}
				</div>
			)}
		</div>
	);
};
