import React from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { candidateColumns } from "./CandidateTableConfig";
import { Candidate } from "@prisma/client";

const candidateData: Candidate = {
	candidateId: "uuid-123123",
	createdAt: new Date(),
	updatedAt: new Date(),
	currentLocation: "Chennai",
	desiredLocation: ["Bangalore"],
	currentSalary: "1750000",
	education: [],
	email: "shankaranarayannan.m.s@gmail.com",
	jobTitle: "Technical Lead",
	name: "Shankar Narayanan",
	noticePeriod: 60,
	phone: "8939358304",
	skills: ["React", "Nodejs"],
	totalExperience: 60,
	workExperience: [],
	id: 1,
	jobPoolId: 2,
};

export const CandidateTable = () => {
	const [data, setData] = React.useState(() => [candidateData]);
	const rerender = React.useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns: candidateColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table className="mt-4">
			<thead className="text-white bg-white">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id} className="">
						{headerGroup.headers.map((header) => (
							<th key={header.id} className="text-xs text-left">
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td className="text-black dark:text-white" key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
			<tfoot>
				{table.getFooterGroups().map((footerGroup) => (
					<tr key={footerGroup.id}>
						{footerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</tfoot>
		</Table>
	);
};
