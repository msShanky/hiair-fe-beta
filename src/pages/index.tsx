import type { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { BaseLanding, UserLanding } from "../components";

const Home: NextPage = () => {
	return (
		<AppLayout title="Hiair | Home">
			<BaseLanding />
		</AppLayout>
	);
};

export default Home;
