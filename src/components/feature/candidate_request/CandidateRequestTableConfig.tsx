import { Candidate } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

export const candidateColumnHelper = createColumnHelper<CandidateRequestResponse>();

// Make some columns!
export const candidateRequestColumns = [
	candidateColumnHelper.accessor("refId", {
		cell: (info) => info.getValue(),
		header: "ID",
	}),
	candidateColumnHelper.accessor("companyInformation.name", {
		id: "companyName",
		cell: (info) => info.getValue(),
		header: () => "companyName",
	}),
	candidateColumnHelper.accessor("jobTitle", {
		id: "jobTitle",
		cell: (info) => info.getValue(),
		header: () => "jobTitle",
	}),
	candidateColumnHelper.accessor("availablePosition", {
		cell: (info) => info.getValue(),
		header: "Available Position",
	}),
	candidateColumnHelper.accessor("status", {
		id: "status",
		cell: (info) => info.getValue(),
		header: () => "status",
	}),
	candidateColumnHelper.accessor("createdAt", {
		id: "createdAt",
		cell: (info) => info.getValue(),
		header: () => "CreatedAt",
	}),
	candidateColumnHelper.display({
		id: "actions",
		cell: (props) => <div>Actions</div>,
	}),
];
