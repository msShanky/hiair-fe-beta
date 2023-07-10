import { Candidate } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

export const candidateColumnHelper = createColumnHelper<Candidate>();

// Make some columns!
export const candidateColumns = [
	candidateColumnHelper.accessor("candidateId", {
		cell: (info) => info.getValue(),
		header: "ID",
	}),
	candidateColumnHelper.accessor("name", {
		cell: (info) => info.getValue(),
		header: "Name",
	}),
	candidateColumnHelper.accessor((row) => row.jobTitle, {
		id: "jobTitle",
		cell: (info) => info.getValue(),
		header: () => "Job Title",
	}),
	candidateColumnHelper.accessor((row) => row.email, {
		id: "email",
		cell: (info) => info.getValue(),
		header: () => "Email",
	}),
	candidateColumnHelper.accessor((row) => row.phone, {
		id: "phone",
		cell: (info) => info.getValue(),
		header: () => "Phone Number",
	}),
	candidateColumnHelper.accessor((row) => row.currentLocation, {
		id: "currentLocation",
		cell: (info) => info.getValue(),
		header: () => "Current Location",
	}),
	candidateColumnHelper.accessor((row) => row.desiredLocation, {
		id: "desiredLocation",
		cell: (info) => info.getValue(),
		header: () => "Desired Location",
	}),
	candidateColumnHelper.accessor((row) => row.currentSalary, {
		id: "currentSalary",
		cell: (info) => info.getValue(),
		header: () => "Current Salary",
	}),
	candidateColumnHelper.accessor((row) => row.totalExperience, {
		id: "totalExperience",
		cell: (info) => info.getValue(),
		header: () => "Total Experience",
	}),
	candidateColumnHelper.accessor((row) => row.skills, {
		id: "skills",
		cell: (info) => info.getValue(),
		header: () => "Skills",
	}),
	candidateColumnHelper.accessor((row) => row.noticePeriod, {
		id: "noticePeriod",
		cell: (info) => info.getValue(),
		header: () => "Notice Period",
	}),
	candidateColumnHelper.accessor((row) => row.jobPoolId, {
		id: "jobPoolId",
		cell: (info) => info.getValue(),
		header: () => "JobPoolId",
	}),
	candidateColumnHelper.display({
		id: "actions",
		cell: (props) => <div>Actions</div>,
	}),
];
