import type { NextPage } from "next";
import Head from "next/head";
import { OnBoardingLayout } from "@/components/layout";
import { Title } from "@mantine/core";
import Lottie from "react-lottie";
import championAnimation from "helpers/animations/champion.json";
import { useAppDispatch } from "app/hooks";
import { resetUserSession } from "@/reducer/userSession";
import { resetUserFeedback } from "@/reducer/userCandidateFeedback";
import { useRouter } from "next/router";

const SessionCompletePage: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const champOptions = {
		loop: true,
		autoplay: true,
		animationData: championAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const handleSessionRestart = () => {
		dispatch(resetUserSession());
		dispatch(resetUserFeedback());
		router.push("/onboarding");
	};

	return (
		<OnBoardingLayout>
			<>
				<Head>
					<title>HiAir | Session Complete</title>
				</Head>
				<section className="flex flex-col items-center justify-center w-full gap-y-12">
					<Lottie isClickToPauseDisabled options={champOptions} width={500} />
					<Title order={1} className="text-6xl font-thin text-primary">
						Session Is Completed
					</Title>

					<button onClick={handleSessionRestart} className="w-48 p-4 text-black rounded-full bg-secondaryBlue">
						Start Over
					</button>
				</section>
			</>
		</OnBoardingLayout>
	);
};

export default SessionCompletePage;
