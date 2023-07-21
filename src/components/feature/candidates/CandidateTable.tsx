import React, { FC, useReducer } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { candidateColumns } from "./CandidateTableConfig";
import { Candidate } from "@prisma/client";

type CandidateTableProps = {
	candidates: Candidate[];
};

export const CandidateTable: FC<CandidateTableProps> = (props) => {
	// const rerender = useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data: props.candidates,
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
