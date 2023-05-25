import React from "react";
import { Mark, Text, Title } from "@mantine/core";
import Lottie from "react-lottie";
import * as selectionAnimation from "helpers/animations/selection-list-clients.json";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const HomeBanner = () => {
	const session = useSession();
	const router = useRouter();
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: selectionAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const handleUserTry = () => {
		if (session.data) {
			router.push("/hiair-beta");
		} else {
			signIn(undefined, { callbackUrl: "/onboarding" });
		}
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
					<Text className="text-2xl text-primary dark:text-secondaryBlue">
						Harness the power of AI & Machine learning in recruitment
					</Text>
					<button
						onClick={handleUserTry}
						className="flex flex-col items-center justify-center w-4/12 p-4 transition duration-300 rounded-md group bg-secondaryYellow hover:cursor-pointer"
					>
						<Text className="text-xl text-center text-black">Try Now!</Text>
						<span className="block h-1 transition-all duration-500 rounded-full max-w-0 group-hover:max-w-full group-hover:w-6/12 bg-primaryAlt"></span>
					</button>
				</div>
				<div className="flex justify-center w-3/6">
					<Lottie options={defaultOptions} height={650} width={650} />
				</div>
			</div>
		</section>
	);
};
