import React from "react";
import { Button, Mark, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import * as selectionAnimation from "helpers/animations/selection-list-clients.json";

export const HomeBanner = () => {
	const router = useRouter();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: selectionAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<section className="w-full bg-violet-light min-h-[850px] flex items-center">
			<div className="container flex flex-row items-center mx-auto space-x-10">
				<div className="w-3/6 space-y-8">
					<Title className="font-sans text-6xl font-light leading-snug text-black dark:text-white">
						Welcome To The New Age <br />
						<Mark className="font-bold text-black underline bg-transparent underline-offset-8 text-8xl decoration-secondaryYellow dark:text-white">
							Hiairing!
						</Mark>
					</Title>
					<Text className="text-white">Harness the power of AI & Machine learning in recruitment</Text>
					<Button
						onClick={() => router.push("/onboarding")}
						className="w-40 text-white bg-primaryAlt hover:bg-secondaryBlue"
					>
						Try Now!
					</Button>
				</div>
				<div className="flex justify-center w-3/6">
					<Lottie options={defaultOptions} height={650} width={650} />
				</div>
			</div>
		</section>
	);
};


