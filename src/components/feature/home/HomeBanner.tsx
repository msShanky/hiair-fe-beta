import React from "react";
import { Button, Mark, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import * as selectionAnimation from "helpers/animations/selection-list-clients.json";

const HomeBanner = () => {
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
		<section className="w-full bg-violet-light min-h-[764px] flex items-center">
			<div className="container flex flex-row items-center mx-auto space-x-10">
				<div className="w-3/6 space-y-8">
					<Title className="font-sans font-light text-6xl leading-snug dark:text-white text-black">
						Welcome To The New Age <br />
						<Mark className="bg-transparent underline underline-offset-8 text-8xl decoration-secondaryYellow dark:text-white text-black font-bold">
							Hiairing!
						</Mark>
					</Title>
					<Text className="text-white">Harness the power of AI & Machine learning in recruitment</Text>
					<Button
						onClick={() => router.push("/onboarding")}
						className="text-white bg-primaryAlt hover:bg-secondaryBlue w-40"
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

export default HomeBanner;
