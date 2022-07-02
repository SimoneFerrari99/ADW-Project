import { useState } from "react";
import { ReactSession } from "react-client-session";
import { gql, useQuery } from "@apollo/client";

import { Box, Paper, TableCell, TableRow } from "@mui/material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	customerTitleTable,
	customerTablePaginationLabel,
} from "../../../utils/strings";

const headCells = [
	{
		id: "ordNum",
		label: "Ordine",
	},
	{
		id: "ordAMT",
		label: "Totale",
	},
	{
		id: "ordDate",
		label: "Data",
	},
	{
		id: "agent.agentCode",
		label: "Agente",
	},
	{
		id: "ordDescription",
		label: "Descrizione",
	},
];

export default function CustomerTable() {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const customerOrders = gql`
		query GetOrdersByCustomerId {
			ordersByCustomerCustCode(custCode: "${ReactSession.get("code")}") {
				ordNum
				ordAMT
				ordDate
				agent {
					agentCode
				}
				ordDescription
			}
		}
	`;

	const { data, loading, error } = useQuery(customerOrders);

	const rows = !loading && !error && data.ordersByCustomerCustCode;

	return (
		<Box sx={{ width: "100%", boxShadow: 4 }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<HomepageTableBody
					tableTitle={customerTitleTable}
					headCells={headCells}
					loading={loading}
					error={error}
					rows={rows}
					tableRows={
						!loading &&
						!error &&
						rows
							.slice()
							.sort(getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								const labelId = `RigaOrdine-${index}`;

								return (
									<TableRow hover tabIndex={-1} key={row.ordNum}>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="normal"
											align="center"
											sx={{ fontWeight: "bold" }}
										>
											{row.ordNum}
										</TableCell>
										<TableCell align="center">{row.ordAMT}</TableCell>
										<TableCell align="center">{row.ordDate}</TableCell>
										<TableCell align="center">
											<OpenPersonInfoDialogButton agentCode={row.agent.agentCode} />
										</TableCell>
										<TableCell align="center">{row.ordDescription}</TableCell>
									</TableRow>
								);
							})
					}
					tablePaginationLabel={customerTablePaginationLabel}
					order={order}
					orderBy={orderBy}
					page={page}
					rowsPerPage={rowsPerPage}
					setOrder={setOrder}
					setOrderBy={setOrderBy}
					setPage={setPage}
					setRowsPerPage={setRowsPerPage}
				></HomepageTableBody>
			</Paper>
		</Box>
	);
}
