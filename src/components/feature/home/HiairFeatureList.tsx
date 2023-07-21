import { Image, Text, Title } from "@mantine/core";
import React from "react";
import siteCopy from "copy/en";

const { features } = siteCopy;

export const HiairFeatureList = () => {
	return (
		<section className="container mx-auto mt-20">
			<Title className="mb-12 text-4xl font-light text-center text-black dark:text-white">Our Feature Pipelines</Title>
			<div className="flex flex-row flex-wrap justify-around gap-8">
				{features.map((item, index) => {
					return (
						<div
							className="grid grid-cols-[200px_minmax(500px,_1fr)] gap-x-2 items-center justify-between w-8/12 h-36 p-4 dark:text-white text-black rounded-md text-center"
							key={`FEATURE_${(index + 45) * 45}`}
						>
							<div className="flex items-center justify-center mx-auto bg-white border-2 rounded-full w-28 h-28 border-primary dark:border-secondaryYellow">
								<Image alt="screening icon" width={64} src={`/images/home/${item.icon}.png`} />
							</div>
							<div className="flex flex-col items-start justify-start gap-y-2">
								<Title order={3} className="font-sans text-xl font-bold text-black dark:text-white">
									{item.label}
								</Title>
								<Text className="text-base text-shadeBlack dark:text-slate-300">{item.summary}</Text>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
