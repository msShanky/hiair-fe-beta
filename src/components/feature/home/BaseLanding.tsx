import React from "react";
import { HomeBanner, FeaturePipelines, HiairFeatureList } from "@/components/feature/home";
import { Image, Title } from "@mantine/core";
import { AppFooter } from "../../common";

export const BaseLanding = () => {
	return (
		<>
			<HomeBanner />
			<FeaturePipelines />
			<HiairFeatureList />
			<section className="container flex flex-col items-center mx-auto mt-20">
				<Title className="mb-12 text-4xl font-light text-center text-black dark:text-white">We are backed by</Title>
				<a href="https://vittbi.com/meity.php" target="_blank">
					<Image
						width="100%"
						src="/images/meity.jpg"
						classNames={{ image: "mx-auto" }}
						className="hover:cursor-pointer"
						alt="vit funding"
					></Image>
				</a>
			</section>
			<AppFooter />
		</>
	);
};
