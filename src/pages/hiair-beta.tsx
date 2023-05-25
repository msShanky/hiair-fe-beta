import type { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { useSession } from "next-auth/react";
import { UserLanding } from "../components";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "helpers/api";

const HiairBetaPage: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { data } = useQuery({ queryKey: ["user"], queryFn: getUser });

	console.log("The user session ======> ", session);

	if (!session && status !== "loading") {
		router.push("/un-authorized");
	}

	console.log("The user query response => ", data);

	return (
		<AppLayout title="Hiair Beta">
			<UserLanding />
		</AppLayout>
	);
};

export default HiairBetaPage;
