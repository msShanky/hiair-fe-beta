import { Image, Text, Title } from "@mantine/core";
import React from "react";
import siteCopy from "copy/en";

const { offerings } = siteCopy;

export const FeaturePipelines = () => {
	return (
		<section className="container mx-auto mt-20">
			<Title className="mb-12 text-4xl font-light text-center text-black dark:text-white">Our Feature Pipelines</Title>
			<div className="flex flex-row flex-wrap justify-around gap-8">
				{offerings.map((item, index) => {
					return (
						<div
							className="flex flex-col items-center justify-center w-1/4 p-4 text-center text-black rounded-md gap-y-4 h-80"
							key={`FEATURE_${(index + 45) * 45}`}
						>
							<div className="flex items-center justify-center bg-white border-2 rounded-full w-28 h-28 border-primary dark:border-secondaryYellow">
								<Image alt="screening icon" width={64} src={`/images/home/${item.icon}.png`} />
							</div>
							<Title order={3} className="font-sans text-xl font-bold text-black dark:text-white">
								{item.label}
							</Title>
							<Text className="text-lg text-shadeBlack dark:text-slate-300">{item.summary}</Text>
						</div>
					);
				})}
			</div>
		</section>
	);
};
