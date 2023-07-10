import type { NextPage } from "next";
import { RootLayout } from "@/components/layout";
import { BaseLanding, CandidateLanding } from "../components";

const Home: NextPage = () => {
	return (
		<RootLayout title="Hiair | Home">
			<BaseLanding />
		</RootLayout>
	);
};

export default Home;
