import React from "react";
import { CandidateRequestTable } from "./CandidateRequestTable";
import { useGetCandidateRequestQuery } from "@/reducer/hiairBaseApi";
import { EmployeeSearch } from "@/components/common/loader";

export const CandidateRequestListing = () => {
	const { data: candidateRequest, isLoading, isSuccess } = useGetCandidateRequestQuery();

	console.log("candidateRequest LIST ==> ", candidateRequest);

	if (isLoading || !isSuccess) {
		return <EmployeeSearch />;
	}
	return (
		<div className="flex items-center justify-center">
			<CandidateRequestTable candidates={candidateRequest as CandidateRequestResponse[]} />
		</div>
	);
};
